// <script>

// Copyright (C) 2005 Ilya S. Lyubinskiy. All rights reserved.
// Technical support: http://www.php-development.ru/
//
// YOU MAY NOT
// (1) Remove or modify this copyright notice.
// (2) Distribute this code, any part or any modified version of it.
//     Instead, you can link to the homepage of this code:
//     http://www.php-development.ru/javascripts/smart-forms.php.
//
// YOU MAY
// (1) Use this code on your website.
// (2) Use this code as a part of another product provided that
//     its main use is not html form processing.
//
// NO WARRANTY
// This code is provided "as is" without warranty of any kind, either
// expressed or implied, including, but not limited to, the implied warranties
// of merchantability and fitness for a particular purpose. You expressly
// acknowledge and agree that use of this code is at your own risk.


// If you find my script useful, you can support my site in the following ways:
// 1. Vote for the script at HotScripts.com (you can do it on my site)
// 2. Link to the homepage of this script or to the homepage of my site:
//    http://www.php-development.ru/javascripts/smart-forms.php
//    http://www.php-development.ru/
//    You will get 50% commission on all orders made by your referrals.
//    More information can be found here:
//    http://www.php-development.ru/affiliates.php


function display(x)
{
  win = window.open();
  for (var i in x) win.document.write(i+' = '+x[i]+'<br>');
}

// ----- Data Arrays -----------------------------------------------------------

// ----- Options -----

var smartforms_options =
  {
    "override_enter"    : true,
    "override_bksp"     : true
  };


// ----- Messages -----

var smartforms_alerts =
  {
    '>'      : "%%Name%% should be more than %%num%%!",
    '<'      : "%%Name%% should be less than %%num%%!",
    '>='     : "%%Name%% should be more or equal to %%num%%!",
    '<='     : "%%Name%% should be less or equal to %%num%%!",
    'ch'     : "%%Name%% contains invalid characters!",
    'chnum_' : "%%Name%% contains invalid characters!",
    'cnt >'  : "You should select more than %%num%% %%name%%!",
    'cnt <'  : "You should select less than %%num%% %%name%%!",
    'cnt >=' : "You should select at least %%num%% %%name%%!",
    'cnt <=' : "You should select at most %%num%% %%name%%!",
    'cnt ==' : "You should select %%num%% %%name%%!",
    'date'   : "Please, enter a valid %%name%%!",
    'email'  : "Please, enter a valid e-mail address!",
    'empty'  : "Please, enter %%name%%!",
    'len >'  : "%%Name%% should contain more than %%num%% characters!",
    'len <'  : "%%Name%% should contain less than %%num%% characters!",
    'len >=' : "%%Name%% should contain at least %%num%% characters!",
    'len <=' : "%%Name%% should contain at most %%num%% characters!",
    'len ==' : "%%Name%% should contain %%num%% characters!",
    'num'    : "%%Name%% is not a valid number!",
    'radio'  : "Please, select %%name%%!",
    'select' : "Please, select %%name%%!",
    'terms'  : "You must agree to the terms first!"
  };

// ----- Form field types -----

var smartforms_nonedit = ' button hidden reset submit ';
var smartforms_edit    = ' checkbox file password radio select-multiple select-one text textarea ';
var smartforms_type    = ' file password text textarea ';
var smartforms_check   = ' checkbox radiox select-multiple select-one ';


// ----- Alert -----------------------------------------------------------------

function smartforms_alert(type, name, num)
{
  name = name.replace(/^\W*(\w*)\W*$/, "$1");

  msg = smartforms_alerts[type];
  msg = msg.replace('%%Name%%', name.substr(0, 1).toUpperCase()+name.substr(1, name.length-1).toLowerCase());
  msg = msg.replace('%%name%%', name.substr(0, 1).toUpperCase()+name.substr(1, name.length-1).toLowerCase());
  msg = msg.replace('%%num%%', num);

  alert(msg);

  return false;
}


// ----- Behave ----------------------------------------------------------------

function smartforms_behave(control, key, rules)
{
  rules = smartforms_rules2array(rules);

  for (var i = 0; i < rules.length; i++)
  {
    var rule = rules[i].split(/\s*:\s*/);

    if (rule.length < 2) continue;
    if (!smartforms_instring(' '+rule[0]+' ', control.name)) continue;

    rule[1] = rule[1].split(/\s+/);

    switch (rule[1][0])
    {
      // ----- count -----

      case 'count':
        document.getElementById(rule[1][1]).innerHTML = control.value.length;
        if (rule[1].length >= 5)
          if (control.value.length < rule[1][2])
               document.getElementById(rule[1][1]).style.color = rule[1][3];
          else document.getElementById(rule[1][1]).style.color = rule[1][4];
        break;

      // ----- next -----

      case 'next':
        if (control.value.length == rule[1][1]) smartforms_focusNext(control);
        break;

      // ----- prev -----

      case 'prev':
        if (control.value.length == 0 && key == 8) smartforms_focusPrev(control);
        break;
    }
  }

  return true;
}


// ----- getElement ------------------------------------------------------------

function smartforms_getElement(tag, name)
{
  for (var i = 0; i < tag.elements.length; i++)
    if (tag.elements[i].name == name) return tag.elements[i];
  return undefined;
}


// ----- inString --------------------------------------------------------------

function smartforms_instring(str, val)
{
  return str.indexOf(' '+val+' ') >= 0;
}


// ----- focusNext -------------------------------------------------------------

function smartforms_focusNext(tag)
{
  for (var i = 0; i < tag.form.elements.length; i++)
    if (tag.form.elements[i] == tag)
      for (var j = i+1; j < tag.form.elements.length; j++)
        if (smartforms_instring(smartforms_edit, tag.form.elements[j].type))
        {
          if (smartforms_instring(smartforms_type, tag.form.elements[j].type))
               smartforms_setSelection(tag.form.elements[j], 0, 0, 'frEnd');
          else tag.form.elements[j].focus();
          return false;
        }

  return true;
}


// ----- focusPrev -------------------------------------------------------------

function smartforms_focusPrev(tag)
{
  for (var i = 0; i < tag.form.elements.length; i++)
    if (tag.form.elements[i] == tag)
      for (var j = i-1; j >= 0; j--)
        if (smartforms_instring(smartforms_edit, tag.form.elements[j].type))
        {
          if (smartforms_instring(smartforms_type, tag.form.elements[j].type))
               smartforms_setSelection(tag.form.elements[j], 0, 0, 'frEnd');
          else tag.form.elements[j].focus();
          return false;
        }

  return true;
}


// ----- Initialize ------------------------------------------------------------

function smartforms_initialize(control, rules)
{
  rules = smartforms_rules2array(rules);

  for (var i = 0; i < rules.length; i++)
  {
    var rule = rules[i].split(/\s*:\s*/);

    if (rule.length < 2) continue;
    if (!smartforms_instring(' '+rule[0]+' ', control.name)) continue;

    rule[1] = rule[1].split(/\s+/);

    switch (rule[1][0])
    {
      // ----- count -----

      case 'count':
        document.getElementById(rule[1][1]).innerHTML = control.value.length;
        if (rule[1].length >= 5)
          if (control.value.length < rule[1][2])
               document.getElementById(rule[1][1]).style.color = rule[1][3];
          else document.getElementById(rule[1][1]).style.color = rule[1][4];
        break;
    }
  }

  return true;
}


// ----- onChange --------------------------------------------------------------

function smartforms_onchange(e)
{
  var ie  = navigator.appName == "Microsoft Internet Explorer";
  var tag = ie ? window.event.srcElement : e.target;

  return true;
}


// ----- onKeypress ------------------------------------------------------------

function smartforms_onkeypress(e)
{
  var ie  = navigator.appName == "Microsoft Internet Explorer";
  var tag = ie ? window.event.srcElement : e.target;
  var key = ie ? window.event.keyCode    : e.which;

  if (smartforms_options['override_backspace'])
    if (key == 8)
      return smartforms_instring(smartforms_type, tag.type);

  if (smartforms_options['override_enter'])
    if (key == 13 && tag.type != 'textarea')
      return smartforms_focusNext(tag);

  return true;
}


// ----- onKeyup ---------------------------------------------------------------

function smartforms_onkeyup(e)
{
  var ie  = navigator.appName == "Microsoft Internet Explorer";
  var tag = ie ? window.event.srcElement : e.target;
  var key = ie ? window.event.keyCode    : e.which;

  var behaviours = smartforms_getElement(tag.form, 'smartforms_behaviours');

  if (behaviours !== undefined) smartforms_behave(tag, key, behaviours.value);
}


// ----- onSubmit --------------------------------------------------------------

function smartforms_onsubmit(e)
{
  var ie  = navigator.appName == "Microsoft Internet Explorer";
  var tag = ie ? window.event.srcElement : e.target;
  if (tag.tagName != 'FORM') tag = tag.form;

  // ----- Validate fields -----

  var rules = smartforms_getElement(tag, 'smartforms_rules');

  if (rules !== undefined)
    for (var i = 0; i < tag.elements.length; i++)
      if (!smartforms_validate(tag.elements[i], rules.value))
      {
        tag.elements[i].focus();
        if (tag.elements[i].select !== undefined) tag.elements[i].select();
        return false;
      }

  // ----- Unset fields -----

  for (var i = 0; i < tag.elements.length; i++)
  {
    if (tag.elements[i].name == 'smartforms_rules')      tag.elements[i].value = '';
    if (tag.elements[i].name == 'smartforms_behaviours') tag.elements[i].value = '';
  }

  return true;
}


// ----- Register --------------------------------------------------------------

function smartforms_register()
{
  for (var i = 0; i < document.forms.length; i++)
    with (document.forms[i])
    {
      var rules      = smartforms_getElement(document.forms[i], 'smartforms_rules');
      var behaviours = smartforms_getElement(document.forms[i], 'smartforms_behaviours');

      if (rules === undefined && behaviours === undefined) continue;

      onsubmit = smartforms_onsubmit;

      for (var j = 0; j < elements.length; j++)
      {
        if (behaviours !== undefined) smartforms_initialize(elements[j], behaviours.value);

        elements[j].onchange   = smartforms_onchange;
        elements[j].onkeypress = smartforms_onkeypress;
        elements[j].onkeyup    = smartforms_onkeyup;
      }
    }
}


// ----- rules2array -----------------------------------------------------------

function smartforms_rules2array(rules)
{
  rules = rules.replace(/^(\s*)(\S.*)/, "$2");
  rules = rules.replace(/(.*\S)(\s*)$/, "$1");
  return rules.split(/\s*;\s*/);
}


// ----- setSelection ----------------------------------------------------------

function smartforms_setSelection(control, start, end, mode)
{
  control.focus();

  // ----- Netscape -----

  if (control.selectionStart !== undefined &&
      control.selectionEnd   !== undefined)
  {
    offset = control.selectionStart;
    if (mode == 'frStart') offset = 0;
    if (mode ==   'frEnd') offset = control.textLength;

    control.selectionStart = offset+start;
    control.selectionEnd   = offset+end;

    return true;
  }

  // ----- IE -----

  if (control.select                 !== undefined &&
      document.selection             !== undefined &&
      document.selection.createRange !== undefined)
  {
    if (mode == 'frStart' || mode == 'frEnd') control.select();

    range = document.selection.createRange();

    if (mode == 'frStart') range.moveEnd  ("character", -range.text.length);
    if (mode == 'frEnd')   range.moveStart("character",  range.text.length);

    range.moveStart("character", start);
    range.moveEnd  ("character", end);
    range.select();

    return true;
  }

  return false;
}


// ----- Validate --------------------------------------------------------------

function smartforms_validate(control, rules)
{
  rules = smartforms_rules2array(rules);

  for (var i = 0; i < rules.length; i++)
  {
    var rule = rules[i].split(/\s*:\s*/);

    if (rule.length < 2) continue;
    if (!smartforms_instring(' '+rule[0]+' ', control.name)) continue;

    rule[1] = rule[1].split(/\s+/);

    switch (rule[1][0])
    {
      // ----- Comparison -----

      case '>':
        if (control.value == '' || isNaN(control.value))
          return smartforms_alert('num', control.title, 0);
        if (control.value <= rule[1][1])
          return smartforms_alert('>', control.title, rule[1][1]);
        break;

      case '<':
        if (control.value == '' || isNaN(control.value))
          return smartforms_alert('num', control.title, 0);
        if (control.value >= rule[1][1])
          return smartforms_alert('<', control.title, rule[1][1]);
        break;

      case '>=':
        if (control.value == '' || isNaN(control.value))
          return smartforms_alert('num', control.title, 0);
        if (control.value < rule[1][1])
          return smartforms_alert('>=', control.title, rule[1][1]);
        break;

      case '<=':
        if (control.value == '' || isNaN(control.value))
          return smartforms_alert('num', control.title, 0);
        if (control.value > rule[1][1])
          return smartforms_alert('<=', control.title, rule[1][1]);
        break;

      // ----- Ch -----

      case 'ch':
        if (!/^([A-Za-z]+)$/.test(control.value))
          return smartforms_alert('ch', control.title, 0);
        break;

      // ----- Chnum_ -----

      case 'chnum_':
        if (!/^(\w+)$/.test(control.value))
          return smartforms_alert('chnum_', control.title, 0);
        break;

      // ----- Cnt -----

      case 'cnt':
        var cnt = 0;

        if (control.type == 'select-multiple')
          for (var k = 0; k < control.options.length; k++)
            if (control.options[k].selected) cnt++;

        if (control.type == 'checkbox')
          with (control.form)
            for (var k = 0; k < elements.length; k++)
              if (elements[k].name == control.title && elements[k].checked) cnt++;

        if (rule[1][1] == '>' && cnt <= rule[1][2])
          return smartforms_alert('cnt >', control.title, rule[1][2]);
        if (rule[1][1] == '<' && cnt >= rule[1][2])
          return smartforms_alert('cnt <', control.title, rule[1][2]);
        if (rule[1][1] == '>=' && cnt < rule[1][2])
          return smartforms_alert('cnt >=', control.title, rule[1][2]);
        if (rule[1][1] == '<=' && cnt > rule[1][2])
          return smartforms_alert('cnt >=', control.title, rule[1][2]);
        if (rule[1][1] == '==' && cnt != rule[1][2])
          return smartforms_alert('cnt ==', control.title, rule[1][2]);

        break;

      // ----- Date -----

      case 'date':
        rule[0] = rule[0].split(/\s+/);

        if (rule[0].length == 3)
        {
          var year;
          var month;
          var day;

          with (control.form)
            for (var k = 0; k < elements.length; k++)
            {
              if (elements[k].name == rule[0][0]) year  = elements[k];
              if (elements[k].name == rule[0][1]) month = elements[k];
              if (elements[k].name == rule[0][2]) day   = elements[k];
            }

          if (year !== undefined && month !== undefined && day !== undefined)
          {
            if (control == year)
              if (year.value  == '' || isNaN(year.value))
                return smartforms_alert('date', year.name, 0);
            if (control == month)
              if (month.value == '' || isNaN(month.value) || month.value < 0 || month.value > 12)
                return smartforms_alert('date', month.name, 0);
            if (control == day)
            {
              if (day.value   == '' || isNaN(day.value)   || day.value   < 0 || day.value   > 31)
                return smartforms_alert('date', day.name, 0);
              date = new Date(year.value, month.value, day.value);
              if (date.getDate() != day.value)
                return smartforms_alert('date', day.name, 0);
            }
          }
        }

        break;

      // ----- Email -----

      case 'email':
        if (!/^(\w+\.)*(\w+)@(\w+\.)+(\w+)$/.test(control.value))
          return smartforms_alert('email', control.title, 0);
        break;

      // ----- Empty -----

      case 'empty':
        if (smartforms_instring(smartforms_type, control.type) && control.value == '')
          return smartforms_alert('empty', control.title, 0);
        break;

      // ----- Len -----

      case 'len':
        if (rule[1][1] == '>' && control.value.length <= rule[1][2])
          return smartforms_alert('len >', control.title, rule[1][2]);
        if (rule[1][1] == '<' && control.value.length >= rule[1][2])
          return smartforms_alert('len <', control.title, rule[1][2]);
        if (rule[1][1] == '>=' && control.value.length < rule[1][2])
          return smartforms_alert('len >=', control.title, rule[1][2]);
        if (rule[1][1] == '<=' && control.value.length > rule[1][2])
          return smartforms_alert('len <=', control.title, rule[1][2]);
        if (rule[1][1] == '==' && control.value.length != rule[1][2])
          return smartforms_alert('len ==', control.title, rule[1][2]);
        break;

      // ----- Num -----

      case 'num':
        if (control.value == '' || isNaN(control.value))
          return smartforms_alert('num', control.title, 0);
        break;

      // ----- Radio -----

      case 'radio':
        var checked = false;
        with (control.form)
          for (var k = 0; k < elements.length; k++)
            if (elements[k].name == control.title && elements[k].checked)
              checked = true;
        if (!checked) return smartforms_alert('radio', control.title, 0);

      // ----- Select -----

      case 'select':
        if (control.value == rule[1][1])
          return smartforms_alert('select', control.title, 0);
        break;

      // ----- Terms -----

      case 'terms':
        if (!control.checked)
          return smartforms_alert('terms', control.title, 0);
        break;
    }
  }

  return true;
}


// ----- Initialize Forms ------------------------------------------------------

smartforms_register();
