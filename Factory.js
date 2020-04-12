var Factory = function(type, content) {
    if(this instanceof Factory) {
        var s = new this[type](content)
        return s
    } else {
        return new Factory(type, content)
    }
}

Factory.prototype = {
    Java: function(content) {

    },
    Javascript: function(content) {

    },
    UI: function(content) {
        this.content = content
        (function(content) {
           var div = document.createElement('div')
           div.innerHTML = content
           div.style.border = '1px solid red'
           document.getElementById('container').appendChild(div)
        })(content)
    },
    PHP: function(content) {

    }
}

var data = [
    { type: 'Javascript', content: 'Javascript哪家强' },
    { type: 'Java', content: 'Java哪家强' },
    { type: 'PHP', content: 'PHP哪家强' },
    { type: 'UI', content: 'UI哪家强' },
    { type: 'UI', content: 'UI哪家强' },
    { type: 'Javascript', content: 'Javascript哪家强' },
    { type: 'Javascript', content: 'Javascript哪家强' }
]

for(var i = 6; i >= 0; i--) {
    Factory(data[i].type, data[i].content)
}