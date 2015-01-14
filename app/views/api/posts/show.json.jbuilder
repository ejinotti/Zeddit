json.extract! @post, *@post.attributes.keys
json.author_name @post.author.username
json.sub_title @post.sub.title
json.points @post.points
json.comment_count @post.comments.count

json.all_comments do |item|
  @all_comments.each do |parent_id, comments|
    json.set! parent_id, comments do |comment|
      json.extract! comment, *comment.attributes.keys
      json.points comment.points
      json.author_name comment.author.username
    end
  end
end
