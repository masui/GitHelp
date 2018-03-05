require 'net/https'
require 'json'
require 'uri'
require 'cgi'
require 'json'

class GitHelp
  DATAFILE = File.expand_path("~/.githelp")
  
  def initialize
    @pagedata = {}
  end
  
  # ページタイトルのリストを取得
  def gettitles
    uri = URI.parse("https://scrapbox.io/api/pages/GitHelp")
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    req = Net::HTTP::Get.new(uri.path)
    res = http.request(req)
    JSON.parse(res.body)['pages'].collect { |page|
      page['title']
    }
  end

  # それぞれのページに対して処理
  def getpage(title)
    puts title
    uri = URI.parse("https://scrapbox.io/api/pages/GitHelp/#{URI.encode(title)}/text")
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    req = Net::HTTP::Get.new(uri.path)
    res = http.request(req)
    text = res.body
    text.force_encoding("utf-8")
    # puts text
    # @pagedata[title] = CGI.unescape(text).split(/\n/)
    @pagedata[title] = text.split(/\n/)
  end

  def process
    #
    # ページデータ取得
    #
    gettitles.each { |title|
      getpage title
    }

    dumpdata = {}
    dumpdata['codes'] = []
    dumpdata['defs'] = []
    
    #
    # 関数/定数を評価"
    #
    puts "-----------------関数/定数を取得"
    @pagedata.each { |title,pagedata|
      puts title
      pagedata. each { |line|
        if line =~ /code:(.*)\.rb$/ then
          puts "==========="
          uri = URI.parse("https://scrapbox.io/api/code/GitHelp/#{URI.encode(title)}/#{$1}.rb")
          http = Net::HTTP.new(uri.host, uri.port)
          http.use_ssl = true
          http.verify_mode = OpenSSL::SSL::VERIFY_NONE
          req = Net::HTTP::Get.new(uri.path)
          res = http.request(req)
          # puts CGI.unescape(res.body)
          text = res.body
          text.force_encoding('utf-8')
          dumpdata['codes'] << text
        end
      }
    }
    puts "-----------------GitHelpデータを検出"
    @pagedata.each { |title,pagedata|
      # puts title
      pagedata. each { |line|
        if line =~ /^\s*[\$\%]/
          puts line
          line.force_encoding("utf-8")
          dumpdata['defs'] << line
        end
      }
    }

    #puts "-----------------githelp.dataに格納"
    #File.open("githelp.data","w"){ |f|
    #  f.puts Marshal.dump(dumpdata)
    #}
    # p dumpdata['codes'].to_json
    
    File.open(DATAFILE,"w"){ |f|
      f.puts dumpdata.to_json
    }
  end
end

githelp = GitHelp.new
githelp.process

# puts githelp.files(['"change"'])
