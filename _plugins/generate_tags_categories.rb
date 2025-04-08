module Jekyll
    class DynamicTagPageGenerator < Generator
      safe true
  
      def generate(site)
        tag_map = Hash.new { |hash, key| hash[key] = [] }
  
        # Scan all collections
        site.collections.each_value do |collection|
          collection.docs.each do |doc|
            next if doc.data['tags'].nil?
  
            Array(doc.data['tags']).each do |tag|
              tag_map[tag] << doc
            end
          end
        end
  
        # Create a page for each tag
        tag_map.each do |tag, docs|
          site.pages << TagPage.new(site, site.source, File.join('tags', slugify(tag)), tag, docs)
        end
      end
  
      private
  
      def slugify(str)
        str.to_s.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
      end
    end
  
    class TagPage < Page
      def initialize(site, base, dir, tag, docs)
        @site = site
        @base = base
        @dir  = dir
        @name = 'index.html'
  
        self.process(@name)
        self.read_yaml(File.join(base, '_layouts'), 'tag.html')
  
        self.data['tag'] = tag
        self.data['title'] = "Posts tagged with '#{tag}'"
        self.data['docs'] = docs
      end
    end
  end
  