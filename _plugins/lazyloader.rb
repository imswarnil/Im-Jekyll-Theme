require 'nokogiri' # For parsing HTML

module Jekyll
  module LazyLoadEnhancer
    # --- Configuration ---
    # Number of images/iframes to consider initially "above the fold" and not lazy-load by default.
    # Adjust this based on your typical page layout.
    ABOVE_THE_FOLD_IMAGE_LIMIT = 2
    ABOVE_THE_FOLD_IFRAME_LIMIT = 1

    # Class to add to elements you explicitly DON'T want lazy-loaded by this plugin.
    NO_LAZY_CLASS = 'no-lazy'

    # Class added to Adsense placeholder divs for client-side JS targeting.
    LAZY_ADSENSE_CLASS = 'lazy-adsense-unit'

    # Default min-height for Adsense placeholders to reduce CLS. Adjust as needed.
    ADSENSE_PLACEHOLDER_MIN_HEIGHT = '250px'
    # --- End Configuration ---

    def self.process_html_content(doc_object)
      # Use doc_object.output which contains the rendered HTML string
      html_content = doc_object.output
      parsed_doc = Nokogiri::HTML.parse(html_content)

      image_count = 0
      iframe_count = 0

      # --- Process Images ---
      parsed_doc.css('img').each do |img|
        next if img['loading'] == 'lazy' # Already explicitly set to lazy
        next if img['src'].to_s.start_with?('data:') # Ignore data URIs
        next if img['class']&.include?(NO_LAZY_CLASS) # Skip if 'no-lazy' class is present

        image_count += 1
        # Apply loading="lazy" if beyond the above-the-fold limit
        img['loading'] = 'lazy' if image_count > ABOVE_THE_FOLD_IMAGE_LIMIT

        # Crucial: Check for width and height attributes for CLS prevention
        unless img['width'] && img['height']
          Jekyll.logger.warn "LazyLoadEnhancer:", "Image missing width/height, vital for LCP/CLS: #{img['src'] || 'inline image'} on page: #{doc_object.relative_path rescue 'unknown page'}"
        end
      end

      # --- Process Iframes ---
      parsed_doc.css('iframe').each do |iframe|
        next if iframe['loading'] == 'lazy' # Already explicitly set to lazy
        next if iframe['class']&.include?(NO_LAZY_CLASS) # Skip if 'no-lazy' class is present

        iframe_count += 1
        # Apply loading="lazy" if beyond the above-the-fold limit
        iframe['loading'] = 'lazy' if iframe_count > ABOVE_THE_FOLD_IFRAME_LIMIT

        # Crucial: Check for width and height attributes for CLS prevention
        unless iframe['width'] && iframe['height']
          Jekyll.logger.warn "LazyLoadEnhancer:", "Iframe missing width/height, vital for LCP/CLS: #{iframe['src'] || 'inline iframe'} on page: #{doc_object.relative_path rescue 'unknown page'}"
        end
      end

      # --- Prepare Adsense for Lazy Loading (Client-Side) ---
      parsed_doc.css('ins.adsbygoogle').each do |ins_tag|
        # Create a placeholder div
        placeholder = Nokogiri::XML::Node.new('div', parsed_doc)
        # Add base class for JS targeting and retain original classes
        placeholder['class'] = "#{LAZY_ADSENSE_CLASS} #{ins_tag['class']}".strip.gsub(/\s+/, ' ')
        
        # Attempt to copy style, focusing on display and explicit height for min-height
        original_style = ins_tag['style'].to_s
        placeholder_style = original_style # Start with original style
        
        # Set a min-height to prevent CLS.
        # If height is explicitly in the style, use that, otherwise use default.
        current_min_height = ADSENSE_PLACEHOLDER_MIN_HEIGHT
        if original_style =~ /height:\s*([^;]+)/
            extracted_height = $1
            # Ensure it's a valid CSS unit, otherwise fallback
            if extracted_height =~ /^\d+(px|em|rem|vh|%)/
                current_min_height = extracted_height
            end
        end
        
        # Append min-height if not already present or if it's different
        unless placeholder_style.include?('min-height:')
            placeholder_style += " min-height: #{current_min_height};"
        end
        # Ensure display:block for ad units
        unless placeholder_style.include?('display:')
            placeholder_style += " display: block;" # Adsense often requires this
        end

        placeholder['style'] = placeholder_style.gsub(/;;+/, ';').strip

        # Copy all data-ad-* attributes and other relevant attributes
        ins_tag.attributes.each do |name, attr|
          if name.start_with?('data-ad-') || ['data-ad-client', 'data-ad-slot', 'data-ad-format', 'data-ad-full-width-responsive'].include?(name)
            placeholder[name] = attr.value
          end
        end
        # Ensure critical ones are there if not already copied
        placeholder['data-ad-client'] ||= ins_tag['data-ad-client']
        placeholder['data-ad-slot'] ||= ins_tag['data-ad-slot']
        placeholder['data-ad-format'] ||= ins_tag['data-ad-format'] || 'auto'
        if ins_tag['data-ad-full-width-responsive']
            placeholder['data-ad-full-width-responsive'] ||= ins_tag['data-ad-full-width-responsive']
        end


        ins_tag.replace(placeholder)
        Jekyll.logger.info "LazyLoadEnhancer:", "Prepared Adsense unit for lazy loading on page: #{doc_object.relative_path rescue 'unknown page'}"
      end

      # Update the document's output with the modified HTML
      doc_object.output = parsed_doc.to_html
    end

    # Register hooks for documents (posts, collections) and pages
    Jekyll::Hooks.register :documents, :post_render do |doc|
      # Process only HTML files
      if doc.output_ext == ".html"
        process_html_content(doc)
      end
    end

    Jekyll::Hooks.register :pages, :post_render do |page|
      # Process only HTML files
      if page.output_ext == ".html"
        process_html_content(page)
      end
    end

  end
end