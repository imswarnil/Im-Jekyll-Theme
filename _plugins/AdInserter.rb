require 'nokogiri' # For parsing HTML

module Jekyll
  module AdInserter
    # --- Configuration ---
    # Number of paragraphs after which to insert the ad.
    PARAGRAPHS_BEFORE_AD = 2

    # HTML for the dummy ad placeholder.
    # You can customize this with classes for styling, and specific ad code later.
    # Make sure it has a defined height or min-height to prevent CLS.
    DUMMY_AD_HTML = <<-HTML
      <div class="dummy-ad-placeholder" style="width: 300px; height: 250px; background: #f0f0f0; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; margin: 20px auto; text-align: center; font-family: sans-serif; color: #777;">
        <p style="margin: 0;">Dummy Ad<br>(300x250)</p>
      </div>
    HTML
    # --- End Configuration ---

    def self.insert_ad_into_content(doc_object)
      # Process only posts (documents in the 'posts' collection)
      return unless doc_object.collection&.label == "posts"
      # And only HTML output
      return unless doc_object.output_ext == ".html"

      html_content = doc_object.output
      parsed_doc = Nokogiri::HTML.parse(html_content)

      # Find the main content area. This selector might need to be adjusted
      # based on your specific post layout's HTML structure.
      # Common selectors: 'article .content', 'div.post-content', 'main article'
      # If your {{ content }} is directly in <article>, then 'article' might be enough.
      # Be specific to avoid inserting ads in sidebars or footers rendered by the same layout.
      content_container = parsed_doc.at_css('article .content') # ADJUST THIS SELECTOR AS NEEDED

      unless content_container
        Jekyll.logger.warn "AdInserter:", "Could not find content container (e.g., 'article .content') to insert ad in #{doc_object.relative_path}. Ad not inserted."
        return
      end

      paragraphs = content_container.css('p') # Find all direct paragraph children
      
      # Only insert if there are enough paragraphs
      if paragraphs.length > PARAGRAPHS_BEFORE_AD
        # Get the paragraph after which the ad should be inserted
        target_paragraph = paragraphs[PARAGRAPHS_BEFORE_AD - 1] # 0-indexed

        # Insert the dummy ad HTML after the target paragraph
        target_paragraph.add_next_sibling(DUMMY_AD_HTML)
        Jekyll.logger.info "AdInserter:", "Inserted dummy ad in #{doc_object.relative_path}"
      else
        Jekyll.logger.info "AdInserter:", "Not enough paragraphs (#{paragraphs.length}) to insert ad in #{doc_object.relative_path} (requires > #{PARAGRAPHS_BEFORE_AD})."
      end

      doc_object.output = parsed_doc.to_html
    end

    # Register the hook to run after the document is rendered
    Jekyll::Hooks.register :documents, :post_render do |doc|
      insert_ad_into_content(doc)
    end
  end
end