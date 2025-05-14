module Jekyll
  class ArchivePage < Page
    def initialize(site, base, dir, page_num, total_pages, paginator_page_docs, paginator_config) # Renamed params
      @site = site
      @base = base
      @dir  = dir.gsub(%r{/{2,}}, '/') # Ensure no double slashes
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), paginator_config['layout']) # Use renamed param

      self.data['title'] = paginator_config['title_prefix'] || "Archive" # Use renamed param
      if page_num > 1
        self.data['title'] += " - Page #{page_num}"
      end

      # Construct the Paginator object using a local variable
      local_paginator_struct = Struct.new(:page, :per_page, :docs, :total_docs, :total_pages,
                               :previous_page, :previous_page_path, :next_page, :next_page_path,
                               :page_trail, :first_page_path, :last_page_path)

      prev_page_num = (page_num > 1) ? page_num - 1 : nil
      next_page_num = (page_num < total_pages) ? page_num + 1 : nil

      prev_page_path = prev_page_num ? self.class.make_path(paginator_config['base_path'], prev_page_num) : nil # Use renamed param
      next_page_path = next_page_num ? self.class.make_path(paginator_config['base_path'], next_page_num) : nil # Use renamed param
      first_page_path = self.class.make_path(paginator_config['base_path'], 1) # Use renamed param
      last_page_path = self.class.make_path(paginator_config['base_path'], total_pages) # Use renamed param


      page_trail_data = []
      (1..total_pages).each do |num|
        page_trail_data << {
          "num" => num,
          "path" => self.class.make_path(paginator_config['base_path'], num), # Use renamed param
          "is_current" => (num == page_num)
        }
      end

      self.data['paginator'] = local_paginator_struct.new( # Use local_paginator_struct and 'paginator' key
        page_num,
        paginator_config['per_page'], # Use renamed param
        paginator_page_docs,        # Use renamed param
        paginator_config['all_docs_count'], # Use renamed param
        total_pages,
        prev_page_num,
        prev_page_path,
        next_page_num,
        next_page_path,
        page_trail_data,
        first_page_path,
        last_page_path
      )

      self.data['collection'] = paginator_config['archive_collection_name'] || 'archive_pages' # Use renamed param
    end

    # Removed site_baseurl param as Jekyll's relative_url filter handles it better in templates
    def self.make_path(base_path, page_num)
      formatted_path = page_num == 1 ? base_path : File.join(base_path, "page", page_num.to_s)
      # Ensure it starts with a slash for consistency in `relative_url`
      return "/#{formatted_path}".gsub(%r{/+}, '/')
    end
  end

  class MultiCollectionPaginator < Generator
    safe true
    priority :low

    def generate(site)
      config = {
        'collections'    => ['posts'],
        'per_page'       => 10,
        'layout'         => 'archive_paginated.html',
        'base_path'      => 'archive',
        'sort_field'     => 'date',
        'sort_reverse'   => true,
        'title_prefix'   => 'Archive',
        'exclude_hidden' => true
      }.merge(site.config['multi_collection_paginator'] || {}) # Changed to 'multi_collection_paginator' for consistency

      all_docs = []
      config['collections'].each do |collection_name|
        if site.collections[collection_name]
          docs_to_add = site.collections[collection_name].docs
          if config['exclude_hidden']
            docs_to_add = docs_to_add.reject { |doc| doc.data['hidden'] || (doc.data.key?('published') && !doc.data['published']) }
          end
          all_docs.concat(docs_to_add)
        else
          Jekyll.logger.warn "MultiCollectionPaginator:", "Collection '#{collection_name}' not found."
        end
      end

      all_docs.sort! do |a, b|
        a_val = a.data[config['sort_field']]
        b_val = b.data[config['sort_field']]

        # Handle nil values gracefully in sorting
        if a_val.nil? && b_val.nil?
          comp = 0
        elsif a_val.nil?
          comp = config['sort_reverse'] ? 1 : -1 # Sort nils last if reverse, first otherwise
        elsif b_val.nil?
          comp = config['sort_reverse'] ? -1 : 1 # Sort nils last if reverse, first otherwise
        else
          # Ensure consistent comparison for different types (e.g., Date vs. String)
          # For dates, they should already be Date objects if frontmatter is parsed correctly.
          # For strings, standard comparison is fine.
          comp = a_val <=> b_val
        end
        config['sort_reverse'] ? (comp ? -comp : 0) : (comp || 0) # Ensure comp is not nil before negating
      end

      config['all_docs_count'] = all_docs.size

      total_pages = (all_docs.size.to_f / config['per_page']).ceil
      total_pages = 1 if total_pages.zero? && all_docs.any? # At least one page if there are docs
      total_pages = 0 if all_docs.empty? # No pages if no docs

      # Only generate pages if there are any to generate
      if total_pages > 0
        (1..total_pages).each do |page_num|
          start_index = (page_num - 1) * config['per_page']
          page_docs = all_docs.slice(start_index, config['per_page']) || []
          dir = page_num == 1 ? config['base_path'] : File.join(config['base_path'], 'page', page_num.to_s)
          archive_page = ArchivePage.new(site, site.source, dir, page_num, total_pages, page_docs, config)
          site.pages << archive_page
        end
        Jekyll.logger.info "MultiCollectionPaginator:", "Generated #{total_pages} archive page(s) in /#{config['base_path']}."
      else
        Jekyll.logger.info "MultiCollectionPaginator:", "No items found to paginate for /#{config['base_path']}."
      end
    end
  end
end