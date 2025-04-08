module Jekyll
    class TagPageGenerator < Generator
      safe true
  
      def generate(site)
        tags = Set.new
        
        # Collect tags from posts
        site.posts.docs.each do |post|
          if post.data['tags']
            post.data['tags'].each { |tag| tags.add(tag) }
          end
        end
        
        # Collect tags from videos
        site.collections['videos'].docs.each do |video|
          if video.data['tags']
            video.data['tags'].each { |tag| tags.add(tag) }
          end
        end
        
        tags.each do |tag|
          site.pages << TagPage.new(site, tag)
        end
      end
    end
  
    class TagPage < Page
      def initialize(site, tag)
        @site = site
        @base = site.source
        @dir = 'tag'
        @name = "#{tag.downcase.gsub(' ', '-')}.html"
        
        self.process(@name)
        self.read_yaml(File.join(@base, '_layouts'), 'tag.html')
        self.data['tag'] = tag
        self.data['title'] = "Tag: #{tag}"
      end
    end
  
    class CategoryPageGenerator < Generator
      safe true
  
      def generate(site)
        categories = Set.new
        
        # Collect categories from posts
        site.posts.docs.each do |post|
          if post.data['category']
            post.data['category'].each { |cat| categories.add(cat) }
          end
        end
        
        # Collect categories from videos
        site.collections['videos'].docs.each do |video|
          if video.data['category']
            video.data['category'].each { |cat| categories.add(cat) }
          end
        end
        
        categories.each do |category|
          site.pages << CategoryPage.new(site, category)
        end
      end
    end
  
    class CategoryPage < Page
      def initialize(site, category)
        @site = site
        @base = site.source
        @dir = 'category'
        @name = "#{category.downcase.gsub(' ', '-')}.html"
        
        self.process(@name)
        self.read_yaml(File.join(@base, '_layouts'), 'category.html')
        self.data['category'] = category
        self.data['title'] = "Category: #{category}"
      end
    end
  end