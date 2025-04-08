# _plugins/generate_tags_categories.rb

module Jekyll
    class DynamicCategoryTagGenerator < Generator
      safe true
  
      def generate(site)
        categories = Hash.new { |hash, key| hash[key] = [] }
        tags = Hash.new { |hash, key| hash[key] = [] }
  
        # Loop through all collections
        site.collections.each do |collection_name, collection|
          collection.docs.each do |doc|
            # Skip drafts or unpublished
            next if doc.data['published'] == false
  
            # Collect categories
            Array(doc.data['category']).each do |cat|
              categories[cat] << {
                'url' => doc.url,
                'title' => doc.data['title'],
                'collection' => collection_name
              }
            end
  
            # Collect tags
            Array(doc.data['tags']).each do |tag|
              tags[tag] << {
                'url' => doc.url,
                'title' => doc.data['title'],
                'collection' => collection_name
              }
            end
          end
        end
  
        # Generate category pages
        categories.each do |category, posts|
          site.pages << CategoryTagPage.new(site, site.source, "category/#{slugify(category)}", "category", category, posts)
        end
  
        # Generate tag pages
        tags.each do |tag, posts|
          site.pages << CategoryTagPage.new(site, site.source, "tag/#{slugify(tag)}", "tag", tag, posts)
        end
      end
  
      private
  
      def slugify(str)
        str.to_s.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
      end
    end
  
    class CategoryTagPage < Page
      def initialize(site, base, dir, type, name, items)
        @site = site
        @base = base
        @dir = dir
        @name = 'index.html'
  
        self.process(@name)
        self.read_yaml(File.join(base, '_layouts'), 'category_tag.html')
        self.data['title'] = "#{type.capitalize}: #{name}"
        self.data['items'] = items
        self.data['type'] = type
        self.data['name'] = name
      end
    end
  end
  