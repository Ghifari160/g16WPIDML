<?php
/*
Plugin Name: Post Generator from IDML
Plugin URI: http://github.com/ghifari160/g16WPIDML
Description: Generates posts from IDML documents.
Version: 0.1.0.0
Author: GHIFARI160
Author URI: http://ghifari160.com
License: MIT License
License URI: https://github.com/Ghifari160/g16WPIDML/blob/master/LICENSE.md
*/

// Post Generator from IDML
//
// Copyright (c) 2018 GHIFARI160, all rights reserved.
// Released under the MIT License
// https://github.com/ghifari160/g16WPIDML/LICENSE.md

define("G16_WPIDML_DEBUG", false);

define("WP_DEBUG", G16_WPIDML_DEBUG);

if(G16_WPIDML_DEBUG)
{
  define("WP_DEBUG_LOG", true);
  define("WP_DEBUG_DISPLAY", true);
}


// Creates "IDML => WP" meta box
function g16_wpidml_meta_box()
{
  echo "<div id=\"g16_wpidml_idml_menu\">"
      ."<p>Upload an IDML file to begin</p>"
      ."</div>"
      ."<input type=\"file\" name=\"g16_wpidml_idml_upload\" "
      ."id=\"g16_wpidml_idml_upload\">"
      ."<script src=\"/wp-content/plugins/g16WPIDML/WebContent/zip.js\"></script>"
      ."<script>"
      ."zip.workerScriptsPath = \"/wp-content/plugins/g16WPIDML/WebContent/\";"
      ."</script>";

  if(!G16_WPIDML_DEBUG)
  {
    echo "<script src=\"/wp-content/plugins/g16WPIDML/g16WPIDML.min.js\"></script>";
  }
  else
  {
    echo "<script src=\"/wp-content/plugins/g16WPIDML/g16WPIDML.dev.js\"></script>";
  }
}

// Setups all meta boxes
function g16_wpidml_init()
{
  add_meta_box("g16_wpidml_meta_box", "IDML => WP", "g16_wpidml_meta_box",
      "post", "normal", "high");
}
add_action("admin_init", "g16_wpidml_init");

?>
