require "test_helper"

class GitHelpTest < Minitest::Test
  def test_that_it_has_a_version_number
    refute_nil ::GitHelp::VERSION
  end

  def test_exec
    exe = File.expand_path("../../exe", __FILE__)+"/githelp"
    result = system "#{exe} -t | grep '表示する' > /dev/null"
    assert result == true
  end
  
end
