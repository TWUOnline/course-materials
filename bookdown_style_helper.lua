function Span (elem)
  if FORMAT:match 'docx' then
    if elem.classes[1] == "blockhead" then
      elem.attributes['custom-style'] = 'blockhead'
      return elem
    elseif elem.classes[1] == "prote" then
        elem.attributes['custom-style'] = 'prote'
        return elem
    else
      return elem
    end
  end
end

function Div (elem)
  if FORMAT:match 'docx' then
    if elem.classes[1] == "reflect" then
      elem.attributes['custom-style'] = 'reflect'
      return elem
    elseif elem.classes[1] == "assessment" then
        elem.attributes['custom-style'] = 'assessment'
        return elem
    else
      return elem
    end
  end
end

