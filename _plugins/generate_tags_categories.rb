# _plugins/category-generator.rb
module Jekyll
    class CategoryPageGenerator < Generator
      safe true
  
      def generate(site)
        collection_name = 'courses' # <-- Replace with your collection
        collection = site.collections[collection_name]
  
        categories = collection.docs.map { |doc| doc.data['category'] }.uniq.compact
  
        categories.each do |category|
          site.pages << CategoryPage.new(site, site.source, File.join('category', category), collection_name, category)
        end
      end
    end
  
    class CategoryPage < Page
      def initialize(site, base, dir, collection, category)
        @site = site
        @base = base
        @dir  = dir
        @name = 'index.html'
  
        self.process(@name)
        self.read_yaml(File.join(base, '_layouts'), 'category.html')
  
        self.data['title'] = "Category: #{category.capitalize}"
        self.data['category'] = category
        self.data['collection'] = collection
        self.data['layout'] = 'category'
      end
    end
  end
  