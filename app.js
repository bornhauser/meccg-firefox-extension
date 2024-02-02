const reverseString = (str) => {
    var newString = "";
    for (var i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
    return newString;
}
const editions = {
    metw: metw,
    metd: metd,
    medm: medm,
    mele: mele,
    meas: meas,
    mewh: mewh,
    meba: meba,
}
const getUrlCardName = (cardName) => {
    return cardName.replaceAll(' ', '').toLowerCase()
        .replaceAll('-', '')
        .replaceAll('–', '')
        .replaceAll('\'', '')
        .replaceAll('\"', '')
        .replaceAll('ô', 'o')
        .replaceAll('ó', 'o')
        .replaceAll('é', 'e')
        .replaceAll('í', 'i')
        .replaceAll('û', 'u')
        .replaceAll('ä', 'a')
        .replaceAll('ë', 'e')
        .replaceAll('ü', 'u')
        .replaceAll('ö', 'o')
        .replaceAll('Ó', 'o')
};
const getImageUrl = (cardName, edition) => {
    return 'https://cardnum.net/img/cards/' + edition.toUpperCase() + '/' + edition + '_' + getUrlCardName(cardName) + '.jpg';
};
$('body').html(function (index, html) {
    let madeChange = false;
    for (const edition in editions) {
        editions[edition].forEach((cardName) => {
            if (
                (edition === 'medm') &&
                (editions.metw.indexOf(cardName) > -1 || editions.metd.indexOf(cardName) > -1)
            ) {
                return;
            }
            if (
                (edition === 'mele') &&
                (editions.metw.indexOf(cardName) > -1 || editions.metd.indexOf(cardName) > -1 || editions.medm.indexOf(cardName) > -1)
            ) {
                return;
            }
            if (
                (edition === 'meas') &&
                (editions.metw.indexOf(cardName) > -1 || editions.metd.indexOf(cardName) > -1 || editions.medm.indexOf(cardName) > -1 || editions.mele.indexOf(cardName) > -1)
            ) {
                return;
            }
            if (
                (edition === 'meba' | edition === 'mewh') &&
                (editions.metw.indexOf(cardName) > -1 || editions.metd.indexOf(cardName) > -1 || editions.medm.indexOf(cardName) > -1 || editions.mele.indexOf(cardName) > -1 || editions.meas.indexOf(cardName) > -1)
            ) {
                return;
            }
            if ((edition === 'mele' || edition === 'mewh' || edition === 'meas' || edition === 'meba') && (editions.metw.indexOf(cardName) > -1 || editions.metd.indexOf(cardName) > -1)) {
                return;
            }
            madeChange = true;
            html = html.replaceAll(cardName, '<span class="meccg-card-name" aria-description="' + reverseString(cardName.replaceAll('\"', '$')) + '">' + cardName + '</span>');
        });
    }
    if (madeChange) {
        return html;
    }
});
$('.meccg-card-name').on("mouseenter", function ($event) {
    const relevantCardName = reverseString($(this).attr('aria-description')).replaceAll('$', '\"');
    const cardElements = [];
    for (const edition in editions) {
        editions[edition].forEach((cardName) => {
            if (cardName === relevantCardName) {
                const backgroundImage = 'url(' + getImageUrl(relevantCardName, edition) + ')';
                cardElements.push(
                    '<div class="meccg-card-image" style="background-image: ' + backgroundImage + '"><div class="meccg-card-inner"></div></div>'
                );
            }
        });
    }
    console.log('relevantCardName', relevantCardName);
    $('#meccgCardContainer').addClass('_visible');
    cardElements.forEach((element) => {
        $('#meccgCardContainer').append(element);
    })
}).on("mouseleave", () => {
    $('#meccgCardContainer').empty().removeClass('_visible');
});

$("<style>" + `

    .meccg-card-name {
        position: relative;
        display: inline-block;
        color: #0080ff;
    }     
    
    .meccg-card-name:hover {
        cursor: pointer;
        text-decoration: underline;
        color: #0051a6;
    }
    
    .meccg-card {
        display: none;
    }
    
    #meccgCardContainer {
        pointer-events: none;
        position: fixed;
        z-index: 10000;
        height: auto;
        width: 95vw;
        right: 0;
        display: none;
        padding: 0;
        gap: 5px;
    }
    
    #meccgCardContainer._visible {
        display: flex;
        justify-content: flex-end;
    }    
    
    .meccg-card-image {
        background-size: contain;
        border-radius: 6%;
        width: 400px;
        background-color: grey;
        display: inline-block;
        flex-shrink: 1;
    }

    .meccg-card-inner {
        width: 100%;
        padding-bottom: 140%;
    }
    
` + "</style>").appendTo("head");
$('body').prepend('<div id="meccgCardContainer"></div>');


