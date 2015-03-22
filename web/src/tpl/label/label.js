<div class="input-group">
    <input type="text" class="form-control" placeholder="输入用户名称搜索" id="selectOneManage" data-keyup="search">
    <span class="input-group-btn">
      <button class="btn btn-default" type="button" data-action="searchbtn">搜索</button>
    </span>
</div> 
<div class="manage-area">
  <ul>
  <%
    for(var i = 0,l=list.length;i<l;i++){
      item = list[i];
  %> 
      <li id="user<%-item.id%>" data-id="<%-item.id%>" data-action="selectuser" data-name="<%-item.name%>"><%-item.name%></li>
  <%}%>
  </ul>
</div>  