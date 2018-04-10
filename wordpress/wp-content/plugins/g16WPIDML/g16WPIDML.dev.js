// g16WPIDML
//
// Copyright (c) 2018 GHIFARI160, all rights reserved.
// Released under the MIT License
// https://github.com/Ghifari160/g16WPIDML/blob/master/LICENSE.md

(function(obj)
{
  var requestFileSystem = obj.webkitRequestFileSystem ||
      obj.mozRequestFileSystem || obj.requestFileSystem;

  function on_error(message)
  {
    alert(message);
  }

  function createTempFile(callback)
  {
    var tempFile_name = "tmp.dat";

    requestFileSystem(TEMPORARY, 4 * 1024 * 1024, function(filesystem)
    {
      function create()
      {
        filesystem.root.getFile(tmpFile_name,
        {
          create: true,
        }, function(zipFile)
        {
          callback(zipFile)
        });
      }

      filesystem.root.getFile(tmpFile_name, null, function(entry)
      {
        entry.remove(create, create);
      }, create);
    });
  }

  var model = (function()
  {
    var URL = obj.webkitURL || obj.mozURL || obj.URL;

    return {
      getEntries : function(file, on_end)
      {
        zip.createReader(new zip.BlobReader(file), function(zipReader)
        {
          zipReader.getEntries(on_end);
        }, on_error);
      },

      getEntryFile : function(entry, creation_method, on_end, on_progress)
      {
        var writer, zipFileEntry;

        function getData()
        {
          entry.getData(writer, function(blob)
          {
            var blobURL = creation_method == "Blob" ? URL.createObjectURL(blob) :
                zipFileEntry.toURL();

            on_end(blobURL);
          }, on_progress);
        }

        if(creation_method == "Blob")
        {
          writer = new zip.BlobWriter();
          getData();
        }
        else
        {
          createTempFile(function(fileEntry)
          {
            zipFileEntry = fileEntry;
            writer = new zip.FileWriter(zipFileEntry);
            getData();
          });
        }
      }
    };
  })();

  (function()
  {
    var file_input = document.getElementById("g16_wpidml_idml_upload");
    var result_div = document.getElementById("g16_wpidml_idml_menu");

    function isFileIDML_byName(file)
    {
      var name = file.name;
      var name_fragments = name.split(".");
      var name_ext = name_fragments[name_fragments.length - 1];

      if(name_ext.toLowerCase() != "idml")
        return false;

      return true;
    }

    function extractEntries(file)
    {
      var ret = array();
      model.getEntries(file, function(entries)
      {
        entries.forEach(function(entry)
        {

        });
      });
    }

    var isReady = false;
    var blob_data = {};

    function isFileIDML_byMIMEType()
    {
      if(!isReady)
        return false;

      if(blob_data["mimetype"] != "application/vnd.adobe.indesign-idml-package")
        return false;

      return true;
    }

    var textframes = [];
    var selected_uids = [];

    function next_to_wizard3(event)
    {
      event.preventDefault();

      var result_children = result_div.getElementsByTagName("input");

      var table = document.createElement("table");
      table.setAttribute("border", 1);
      table.setAttribute("cellspacing", 0);
      table.setAttribute("cellspadding", 0);

      var tr = document.createElement("tr");

      var td1 = document.createElement("td");
      td1.innerHTML = "Order #";
      tr.appendChild(td1);

      var td2 = document.createElement("td");
      td2.innerHTML = "Text Frame Content";
      tr.appendChild(td2);

      table.appendChild(tr);

      var n = 1;
      for(var i = 0; i < result_children.length; i++)
      {
        var current_element = result_children[i];
        if(current_element.getAttribute("type") == "checkbox" &&
            current_element.checked)
        {
          var current_element_id_fragments = current_element.getAttribute("id")
              .split("_");
          var current_uid = current_element_id_fragments[current_element_id_fragments.length - 1];

          selected_uids.push(current_uid);

          tr = document.createElement("tr");
          tr.setAttribute("id", "g16_wpidml_idml_menu_row_" + i);

          td1 = document.createElement("td");

          var input = document.createElement("input");
          input.setAttribute("type", "text");
          input.setAttribute("maxlength", "3");
          input.setAttribute("id", "g16_wpidml_idml_menu_order_" + i);
          input.setAttribute("value", n++);
          td1.appendChild(input);

          tr.appendChild(td1);

          td2 = document.createElement("td");
          td2.innerHTML = current_element.parentNode.parentNode
              .childNodes[1].childNodes[0].innerHTML;
          tr.appendChild(td2);

          table.appendChild(tr);
        }
      }

      result_div.innerHTML = "";

      var p = document.createElement("p");
      p.innerHTML = "Reorder the following text frames";
      result_div.appendChild(p);

      result_div.appendChild(table);

      var button = document.createElement("button");
      button.setAttribute("id", "g16_wpidml_menu_nextbtn");
      button.innerHTML = "Generate Post";
      button.addEventListener("click", next_to_wizardDone);
      result_div.appendChild(button);
    }

    function next_to_wizardDone()
    {
      event.preventDefault();

      var ordered_uids = [];
      var post_str = "";

      var result_children = result_div.getElementsByTagName("input");
      for(var i = 0; i < result_children.length; i++)
      {
        var current_element = result_children[i];
        var current_element_id_fragments = current_element.getAttribute("id")
            .split("_");
        var current_uid = current_element_id_fragments[current_element_id_fragments.length - 1];
        if(current_element.getAttribute("type") == "text")
        {
          ordered_uids[current_element.value - 1] = current_uid;
        }
      }

      for(var i = 0; i < ordered_uids.length; i++)
      {
        post_str += textframes[ordered_uids[i]];
      }

      result_div.innerHTML = "";

      var p = document.createElement("p");
      p.innerHTML = "Happy editing!<br><br>";

      var a1 = document.createElement("a");
      a1.setAttribute("href", "https://github.com/ghifari160/wpidml");
      a1.setAttribute("target", "g16wpidml_tab");
      a1.innerHTML = "g16WPIDML";
      p.appendChild(a1);

      p.innerHTML += " by ";

      var a2 = document.createElement("a");
      a2.setAttribute("href", "https://github.com/ghifari160");
      a2.setAttribute("target", "g16wpidml_tab");
      a2.innerHTML = "GHIFARI160";
      p.appendChild(a2);

      result_div.appendChild(p);

      document.getElementById("content-html").click();
      document.getElementById("content").value = post_str;
      document.getElementById("content-tmce").click();
    }

    function populateSelection()
    {
      result_div.innerHTML = "";

      var table = document.createElement("table");
      table.setAttribute("border", 1);
      table.setAttribute("cellspacing", 0);
      table.setAttribute("cellspadding", 0);
      for(var i = 0; i < textframes.length; i++)
      {
        var tr = document.createElement("tr");
        tr.setAttribute("id", "g16_wpidml_idml_menu_row_" + i);

        var td1 = document.createElement("td");

        var checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", "g16_wpidml_idml_menu_checkbox_" + i);
        td1.appendChild(checkbox);

        tr.appendChild(td1);

        var td2 = document.createElement("td");
        if(textframes[i].length > 100)
          td2.innerHTML = textframes[i].substr(0, 100) + "...";
        else
          td2.innerHTML = textframes[i];
        tr.appendChild(td2);

        table.appendChild(tr);
      }

      var p = document.createElement("p");
      p.innerHTML = "Select any text frames to include them in the post (you will reorder them in the next screen)";
      result_div.appendChild(p);

      result_div.appendChild(table);

      var button = document.createElement("button");
      button.setAttribute("id", "g16_wpidml_menu_nextbtn");
      button.innerHTML = "Next";
      button.addEventListener("click", next_to_wizard3);
      result_div.appendChild(button);
    }

    function parseIDML()
    {
      if(!isReady)
      {
        setTimeout(parseIDML, 1000);
        return;
      }

      if(!isFileIDML_byMIMEType())
      {
        error_fileIsNotIDML();
      }

      var parser = new DOMParser();

      // Process IDML file
      for(var key in blob_data)
      {
        var key_paths = key.split("/");

        // Parse stories
        if(key_paths.length > 1 && key_paths[0] == "Stories")
        {
          var story_name_fragments = key_paths[1].split("_");

          if(story_name_fragments.length > 1 && story_name_fragments[0] == "Story")
          {
            var story_id = story_name_fragments[1];

            var xml_str = blob_data[key];
            var xml_doc = parser.parseFromString(xml_str, "text/xml");

            var story_paragraphs = xml_doc.getElementsByTagName("ParagraphStyleRange");
            var story_string = "";

            // Parse paragraphs from the current story
            for(var i = 0; i < story_paragraphs.length; i++)
            {
              var paragraph_string = "<p>";
              var paragraph_characters = story_paragraphs[i].getElementsByTagName("CharacterStyleRange");
              // Parse characters from the current paragraph
              for(var j = 0; j < paragraph_characters.length; j++)
              {
                // Parse font styling
                if(paragraph_characters[j].getAttribute("FontStyle") == "Bold")
                  paragraph_string += "<strong>";
                else if(paragraph_characters[j].getAttribute("FontStyle") == "Italic")
                  paragraph_string += "<em>";

                var characters_children = paragraph_characters[j].childNodes;
                // Parse the contents of the current character
                for(var k = 0; k < characters_children.length; k++)
                {
                  if(characters_children[k].nodeName == "Content")
                  {
                    paragraph_string += characters_children[k].firstChild.nodeValue;
                  }
                  else if(characters_children[k].nodeName == "Br")
                    paragraph_string += "<br>";
                }

                // Clean up font styling
                if(paragraph_characters[j].getAttribute("FontStyle") == "Bold")
                  paragraph_string += "</strong>";
                else if(paragraph_characters[j].getAttribute("FontStyle") == "Italic")
                  paragraph_string += "</em>";
              }
              paragraph_string += "</p>";

              story_string += paragraph_string;
            }

            // Store the contents of the current story if it is not empty
            if(story_string != "<p></p>")
              textframes.push(story_string);
          }
        }
      }

      populateSelection();
    }

    function error_fileIsNotIDML()
    {
      result_div.innerHTML = "";

      var p = document.createElement("p");
      p.innerHTML = "Invalid file. Accepted format: IDML";

      result_div.appendChild(p);
    }

    file_input.addEventListener("change", function()
    {
      isReady = false;
      file_input.disabled = true;

      if(!isFileIDML_byName(file_input.files[0]))
      {
        error_fileIsNotIDML();

        file_input.disabled = false;
        return;
      }

      model.getEntries(file_input.files[0], function(entries)
      {
        result_div.innerHTML = "";

        var i = 0;
        entries.forEach(function(entry)
        {
          model.getEntryFile(entry, "Blob", function(blobURL)
          {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", blobURL, true);
            xhr.responseType = "blob";
            xhr.onload = function(e)
            {
              if(this.status == 200)
              {
                var blob = this.response;

                var blob_reader = new FileReader();
                blob_reader.addEventListener("loadend", function()
                {
                  blob_data[entry.filename] = blob_reader.result;
                  blob_data["length"] = i+1;

                  if(i == entries.length - 1)
                  {
                    file_input.parentNode.removeChild(file_input);
                    isReady = true;
                    parseIDML();
                  }
                  i++;
                });
                blob_reader.readAsText(blob);
              }
            }
            xhr.send();
          });
        });
      });
    }, false);
  })();

})(this);
