http_path = "/"
css_dir = "../htdocs/assets/css"
sass_dir = "."
images_dir = "../htdocs/assets/images"
#javascripts_dir = "htdocs/assets/scripts"
output_style = :compact
line_comments = false
relative_assets = true

# Make a copy of sprites with a name that has no uniqueness of the hash.
on_sprite_saved do |filename|
  if File.exists?(filename)
    FileUtils.cp filename, filename.gsub(%r{-s[a-z0-9]{10}\.png$}, '.png')
  end
end

# Replace in stylesheets generated references to sprites
# by their counterparts without the hash uniqueness.
on_stylesheet_saved do |filename|
  if File.exists?(filename)
    css = File.read filename
    File.open(filename, 'w+') do |f|
      f << css.gsub(%r{-s[a-z0-9]{10}\.png}, '.png')
    end
  end
end

#http_path = "/"
#css_dir = "CSS�̏o�͏ꏊ"
#sass_dir = "SCSS�̕ۑ��ꏊ"
#images_dir = "�摜�̕ۑ��ꏊ"
#javascripts_dir = "JavaScript�̕ۑ��ꏊ"
#output_style = Sass�̏o�͌`���i:expanded or :nested or :compact or :compressed�j
#line_comments = CSS��SCSS�̍s�ԍ����o�͂��邩�itrue or false�j