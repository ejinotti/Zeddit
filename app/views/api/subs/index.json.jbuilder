json.array! @subs do |sub|
  json.extract! sub, *sub.attributes.keys
  json.subbed_count sub.subscriptions.count
end
