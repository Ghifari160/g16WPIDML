=== Post Generator from IDML ==
Contributors: ghifari160
Tags: post, generator, indesign, idml
Requires at least: 4.9
Tested up to: 4.9
Requires PHP: 5.6
Stable tag: /trunk/
License: MIT License
License URI: https://raw.githubusercontent.com/Ghifari160/g16WPIDML/master/LICENSE

Generates posts from IDML documents.

== Description ==
Have you ever have the need to generate a Wordpress post from an InDesign document? Yeah, me neither. But in case you do, this plugin is for you because this plugin allows you to generate a Wordpress post from an IDML InDesign document in four steps:

1. Upload the InDesign document. It has to be an IDML file, though.
2. Select the text frames to post.
3. Reorder the text frames.
4. Click the "Generate Post" button, sit back, and relax. Or, you know, do more editing.

== Installation ==
1. Do one of the following:
  - Upload the plugin files to the `wp-content/plugins/g16WPIDML` directory
  - Use the Wordpress plugin uploader
  - Install the plugin from the plugin screen (search for Post Generator from IDML)
2. Activate the plugin through the plugins screen in Wordpress.

== Frequently Asked Questions ==

= How do I use this plugin? =
Open the post editor like you normally would. There should now be a panel titled "IDML => WP" just below the post editor. Upload your IDML file and follow the wizard.

= How do I make the IDML file? =
Open the InDesign document that you would like to use, the click File > Export. Change the file format to InDesign Markup (IDML).

= I don't see IDML as an export option... =
Make sure you are using Adobe InDesign CS5 or later versions.

= Does this plugin uploads the IDML files? =
No. Everything is actually done by the browser of the user. The IDML files are extracted and parsed into the memory of the user.

= I found a bug or I need other help... =
Go to the [issue tracker][g16-wpidml-issue]. Please be descriptive with your reports, we can't help you if we don't understand your issue.

[g16-wpidml-issue]: https://github.com/ghifari160/g16WPIDML/issues

== Changelog ==

= v0.1 =
First official release.
* Development definitions were added for debug purposes.
* License URLs now leads to raw text files, not parsed Markdown files.

= v0.0.1.0 =
Initial version, build specifically for the [Westerner][westerner-link]

[westerner-link]: http://mwwesterner.com

== Upgrade Notice ==

= v0.1 =
This version was approved for release, through the review process, by Wordpress.
