function initList() {
    document.getElementById('fields').style.display = 'block'
    fetch('data/parcelas.json').then(function(parcelas) {
        return parcelas.json()
    }).then(function(par) {
        document.getElementById('fields').appendChild(makeUL(par));
    })
}

function makeUL(array) {

    for (var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');
        var link = document.createElement('a');
        link.setAttribute("href", "#");

        // Set its contents:
        link.appendChild(document.createTextNode(array[i].nombre));
        item.appendChild(link);

        // Add it to the list:
        document.getElementById('fields').appendChild(item);
    }

    // Finally, return the constructed list:
}

// Add the contents of options[0] to #foo: