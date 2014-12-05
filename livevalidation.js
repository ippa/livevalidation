Livevalidation = {
  setup: function(options) {
    var that = this;

    if(!options) options = {};
    var selector = options.element || "form";
    var validate_on = options.validate_on || ["keyup", "blur", "change"];
    this.disable_valid_fields = options.disable_valid_fields;
    
    this.form = document.querySelector(selector);
    this.elements = this.form.querySelectorAll("input:not([type=submit]),select");
    
    this.form.addEventListener("submit", this.submit.bind(this) );

    [].forEach.call(this.elements, function(element) {
      validate_on.forEach( function(event) {
        element.addEventListener(event, function(event) { that.validate(event.target) } );
      });
    });
  },

  validate: function(element) {
    if(element.validity) {
      this.setValidAttribute(element, element.validity.valid);
    
      var label = document.querySelector('label[for="' + element.id + '"]');
      this.setValidAttribute(label, element.validity.valid);
      return element.validity.valid;
    }
    return false;
  },

  submit: function(event) {
    var that = this;

    [].filter.call(this.elements, function(element) {
      return that.validate(element);
    }).forEach( function(element) {
      /*
      element.disabled = true;
      element.setAttribute("data-locked", true);
      var label = document.querySelector('label[for="' + element.id + '"]');
      label.setAttribute("data-locked", true);
      */
    });

    var pass = [].every.call(this.elements, function(element) {
      element.focus();
      return that.validate(element);
    });
    if(pass === false)  event.preventDefault();
  },

  setValidAttribute: function(target, valid) {
    if(!target) return;
    if(valid) {
      target.setAttribute("data-valid", true);
      target.removeAttribute("data-invalid");
    }
    else {
      target.setAttribute("data-invalid", true);
      target.removeAttribute("data-valid"); 
    } 
  } 
}

if(typeof module !== "undefined" && ('exports' in module)) { module.exports = Livevalidation }
