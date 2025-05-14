module Jekyll
  class ArchivePage < Page
    def initialize(site, base, dir, page_num, total_pages, Paginator_page_docs, Paginator_config)
      @site = site
      @base = base
      @dir  = dir.gsub(%r{/{2,}}, '/') # Ensure no double slashes
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), Paginator_config['layout'])

      self.data['title'] = Paginator_config['title_prefix'] || "Archive"
      if page_num > 1
        self.data['title'] += " - Page #{page_num}"
      end

      # Construct the Paginator object
      Paginator = Struct.new(:page, :per_page, :docs, :total_docs, :total_pages,
                             :previous_page, :previous_page_path, :next_page, :next_page_path,
                             :page_trail, :first_page_path, :last_page_path)

      prev_page_num = (page_num > 1) ? page_num - 1 : nil
      next_page_num = (page_num < total_pages) ? page_num + 1 : nil

      prev_page_path = prev_page_num ? self.class.make_path(Paginator_config['base_path'], prev_page_num, site.baseurl) : nil
      next_page_path = next_page_num ? self.class.make_path(Paginator_config['base_path'], next_page_num, site.baseurl) : nil
      first_page_path = self.class.make_path(Paginator_config['base_path'], 1, site.baseurl)
      last_page_path = self.class.make_path(Paginator_config['base_path'], total_pages, site.baseurl)

      # Simple page trail (can be made more complex with ellipsis)
      page_trail_data = []
      (1..total_pages).each do |num|
        page_trail_data << {
          "num" => num,
          "path" => self.class.make_path(Paginator_config['base_path'], num, site.baseurl),
          "is_current" => (num == page_num)
        }
      end

      self.data['Paginator'] = Paginator.new(
        page_num,
        Paginator_config['per_page'],
        Paginator_page_docs,
        Paginator_config['all_docs_count'],
        total_pages,
        prev_page_num,
        prev_page_path,
        next_page_num,
        next_page_path,
        page_trail_data,
        first_page_path,
        last_page_path
      )

      # Make collection name available if desired
      self.data['collection'] = Paginator_config['archive_collection_name'] || 'archive_pages'
    end

    def self.make_path(base_path, page_num, site_baseurl = "")
      formatted_path = page_num == 1 ? base_path : File.join(base_path, "page", page_num.to_s)
      # Ensure it starts with a slash and respects site.baseurl
      path = "/#{formatted_path}".gsub(%r{/+}, '/')
      # No, site.baseurl should not be prepended here, Jekyll handles it with relative_url filter
      return path
    end
  end

  class MultiCollectionPaginator < Generator
    safe true # Important for GitHub Pages compatibility
    priority :low # Run after other generators that might populate collections

    def generate(site)
      # Default config
      config = {
        'collections'    => ['posts'],
        'per_page'       => 10,
        'layout'         => 'archive_paginated.html',
        'base_path'      => 'archive',
        'sort_field'     => 'date',
        'sort_reverse'   => true,
        'title_prefix'   => 'Archive',
        'exclude_hidden' => true # Exclude items with `hidden: true` or `published: false`
      }.merge(site.config['multi_collection_Paginator'] || {})

      # --- 1. Gather and sort all documents ---
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

      # Sort documents
      all_docs.sort! do |a, b|
        a_val = a.data[config['sort_field']]
        b_val = b.data[config['sort_field']]
        # Basic comparison, can be expanded for different types
        if a_val.nil? && b_val.nil?
          comp = 0
        elsif a_val.nil?
          comp = -1 # nils first
        elsif b_val.nil?
          comp = 1  # nils first
        else
          comp = a_val <=> b_val
        end
        config['sort_reverse'] ? -comp : comp
      end

      config['all_docs_count'] = all_docs.size # Store for Paginator

      # --- 2. Calculate total pages ---
      total_pages = (all_docs.size.to_f / config['per_page']).ceil
      total_pages = 1 if total_pages.zero? # Ensure at least one page if there are docs, or even if not for an empty archive

      # --- 3. Create ArchivePage instances for each page ---
      (1..total_pages).each do |page_num|
        start_index = (page_num - 1) * config['per_page']
        page_docs = all_docs.slice(start_index, config['per_page']) || []

        # Determine directory for the page
        # Page 1 at base_path, others at base_path/page/N
        dir = page_num == 1 ? config['base_path'] : File.join(config['base_path'], 'page', page_num.to_s)

        archive_page = ArchivePage.new(site, site.source, dir, page_num, total_pages, page_docs, config)
        site.pages << archive_page
      end
      Jekyll.logger.info "MultiCollectionPaginator:", "Generated #{total_pages} archive page(s) in /#{config['base_path']}."
    end
  end
end