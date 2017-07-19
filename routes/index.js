<!DOCTYPE html>
<html lang="en">
  <head>
    <title> Decision Maker </title>
     <% include partials/_header %>
  <head>
  <body>

 <main class="container">
  <form id="pollForm" action="/" method="POST" class="form-horizontal">
    <div class= "form-group">
      <label class="control-label col-xs-1" for="email"><b>Email</b>:</label>      <!--https://www.w3schools.com/bootstrap/bootstrap_forms_sizing.asp-->
    <div class= "form-group">
      <label class="control-label col-xs-1" for="email" data-options="1" id="title">Title:</label>
      <div class='col-xs-4'>
       <input class= ".formcontrol" name="title" type="text" placeholder="Please enter a title for "/>
      </div>
    </div>
    <div class='col-xs-4'>
        <input class= ".formcontrol" name="email" type="email" placeholder="Enter email here">
      </div>
    </div>
