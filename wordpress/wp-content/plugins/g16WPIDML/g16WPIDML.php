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

// Should be specific to this plugin
define("G16_WPIDML_DEBUG", false);
define("G16_WPIDML_VER", "v0.1.0.0");

if(G16_WPIDML_DEBUG)
{
  // Set other debug stuff specific to g16WPIDML here.

  // Wordpress definitions
  if(!defined("WP_DEBUG"))
  {
    define("WP_DEBUG", true);
  }

  if(!defined("WP_DEBUG_LOG"))
  {
    define("WP_DEBUG_LOG", true);
  }

  if(!defined("WP_DEBUG_DISPLAY"))
  {
    define("WP_DEBUG_DISPLAY", true);
  }
}


// Creates "IDML => WP" meta box
function g16_wpidml_meta_box()
{
  echo "<div id=\"g16_wpidml_idml_menu\">"
      ."<p>Upload an IDML file to begin</p>"
      ."</div>"
      ."<input type=\"file\" name=\"g16_wpidml_idml_upload\" "
      ."id=\"g16_wpidml_idml_upload\">"
      ."<script>"
      ."zip.workerScriptsPath = \"".plugins_url("WebContent/", __FILE__)."\";"
      ."</script>";
}

// Setups all meta boxes
function g16_wpidml_init()
{
  wp_enqueue_script("zip.js", plugins_url("WebContent/zip.js", __FILE__));

  if(!G16_WPIDML_DEBUG)
  {
    wp_enqueue_script("g16WPIDML.min.js",
      plugins_url("g16WPIDML.min.js", __FILE__),
      array("zip.js"), G16_WPIDML_VER, true);
  }
  else
  {
    wp_enqueue_script("g16WPIDML.dev.js",
      plugins_url("g16WPIDML.dev.js", __FILE__),
      array("zip.js"), G16_WPIDML_VER, true);
  }

  add_meta_box("g16_wpidml_meta_box", "IDML => WP", "g16_wpidml_meta_box",
      "post", "normal", "high");
}
add_action("admin_init", "g16_wpidml_init");

?>
