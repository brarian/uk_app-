function compose() {
    var funcs = Array.prototype.slice.call(arguments).reverse(); // turn args into (reversed) array
    return function() {
        return funcs.slice(1).reduce(function(res, fn) {
            return fn(res);
        }, funcs[0].apply(undefined, arguments));
    }
}

$(document).ready(function() {
    renderSaved();
    handleDeleteFromSaved();
    addAComment();
});

// const foo = compose(generateArticlesString, JSON.parse);

function renderSaved() {
    const foo = generateArticlesString(JSON.parse(localStorage.savedArticlesCollection));
    $('.faved').html(foo);
}



// function renderSaved() {
//     // const foo = localStorage.savedArticlesCollection.map(articles => (article, index, source));
//     // // return items.join("");
//     const foo = generateArticlesJSON.parse(localStorage.savedArticlesCollection);
//     $('.faved').html(foo);
// }

function handleDeleteFromSaved() {
    $('.delete').on('click', function() {
        const storageContainer = localStorage.getItem('savedArticlesCollection');
        const openedContainer = JSON.parse(storageContainer);
        const itemToBeRemoved = getIndexFromElement($(this).parent());
        openedContainer.splice(itemToBeRemoved, 1);
        const newlySplicedArray = JSON.stringify(openedContainer);
        localStorage.setItem('savedArticlesCollection', newlySplicedArray);
        renderSaved();
    });
};

function getIndexFromElement(element) {
    const index = element.data('item-index');
    return index;
}

function addAComment() {
    $('.comment-form').submit(function(event) {
        event.preventDefault();
        const Strings = $('.comment-value').val();
        console.log(Strings);
        $('.haha').append("<li>" + Strings + " </li>");
        saveComment(Strings);
    });
}