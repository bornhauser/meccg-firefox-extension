var editions = {
    metw: _1_theWizards,
    metd: _2_theDragons,
    medm: _3_darkMinions,
    mele: _4_lidlessEye,
    meas: _5_againstTheShadow,
    mewh: _6_whiteHand,
    meba: _7_theBalrog,
}
var doneCardNames = [];
const cardNamesThatAreContainedInOtherNames = [];
const specialCharacters_1 = [
    ['ô', 'o'],
    ['ó', 'o'],
    ['é', 'e'],
    ['í', 'i'],
    ['û', 'u'],
    ['ä', 'a'],
    ['ë', 'e'],
    ['ü', 'u'],
    ['ö', 'o'],
    ['Ó', 'o'],
    ['â', 'a'],
    ['û', 'u'],
    ['î', 'i'],
    ['á', 'a'],
];

const specialCharacters_2 = [
    [' ', ''],
    ['-', ''],
    ['–', ''],
    ['\'', ''],
    ['\"', ''],
    [',', ''],
    ['.', ''],
];

const reverseString = (str) => {
    var newString = "";
    for (var i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
    return newString;
}
const getUrlCardName = (cardName) => {
    cardName = cardName.toLowerCase();
    cardName = applySpecialCharacters(cardName, specialCharacters_1);
    cardName = applySpecialCharacters(cardName, specialCharacters_2);
    return cardName;
};

const applySpecialCharacters = (cardName, pairs) => {
    pairs.forEach((pair) => {
        cardName = cardName.replaceAll(pair[0], pair[1]);
    })
    return cardName;
}

const getImageUrl = (cardName, edition) => {
    return 'https://cardnum.net/img/cards/' + edition.toUpperCase() + '/' + edition + '_' + getUrlCardName(cardName) + '.jpg';
};

const replace = (cardName, html) => {
    if (doneCardNames.indexOf(cardName) === -1) {
        const nameVaiants = [cardName];
        const variant_1 = applySpecialCharacters(cardName, specialCharacters_1);
        if (nameVaiants.indexOf(variant_1) === -1) {
            nameVaiants.push(variant_1);
        }
        nameVaiants.forEach((_cardName) => {
            html = html.replaceAll(_cardName, '<span class="meccg-card-name" aria-description="' + reverseString(cardName.replaceAll('\"', '$')) + '">' + _cardName + '</span>');
        });
        doneCardNames.push(cardName);
    }
    return html;
}

const removeScriptElementsFromHtml = (html) => {
    return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script\s*>/gi, " ");
}

const collectCardNamesThatAreContainedInOtherNames = () => {
    for (const editionKey in editions) {
        editions[editionKey].forEach((cardName) => {
            for (const editionKey in editions) {
                editions[editionKey].forEach((cardNameToCompare) => {
                    if (
                        cardNameToCompare.length > cardName.length &&
                        cardNameToCompare.indexOf(cardName) > -1 &&
                        cardNamesThatAreContainedInOtherNames.indexOf(cardName) === -1
                    ) {
                        cardNamesThatAreContainedInOtherNames.push(cardName);
                    }
                });
            }
        });
    }
}
collectCardNamesThatAreContainedInOtherNames();

const renderHtml = () => {
    $('body').html(function (index, html) {
        for (const editionKey in editions) {
            editions[editionKey].forEach((cardName) => {
                if (cardNamesThatAreContainedInOtherNames.indexOf(cardName) === -1) {
                    html = replace(cardName, html);
                }
            });
        }
        cardNamesThatAreContainedInOtherNames.forEach((cardName) => {
            html = replace(cardName, html);
        });
        return html;
    }).prepend('<div id="meccgIcon"></div>').prepend('<div id="meccgCardContainer"></div>');
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
        $('#meccgCardContainer').addClass('_visible');
        $('#meccgIcon').addClass('_invisible');
        cardElements.forEach((element) => {
            $('#meccgCardContainer').append(element);
        })
    }).on("mouseleave", () => {
        $('#meccgIcon').removeClass('_invisible');
        $('#meccgCardContainer').empty().removeClass('_visible');
    });
    $("<style>" + `
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .fade-in {
          animation-name: fadeIn;
          animation-duration: 0.4s;
        }
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
            z-index: 20000000;
            pointer-events: none;
            position: fixed;
            height: auto;
            width: 95vw;
            top: 5px;
            right: 5px;
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
        #meccgIcon {
            position: fixed;
            pointer-events: none;
            z-index: 10000000;
            top: 7px;
            right: 7px;
            width: 24px;
            height: 24px;
            background-image: url('data:image/png;base64,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');
            background-size: contain;
            animation-name: fadeIn;
            animation-duration: 0.4s;
            border: 2px solid #18a5fd;
            border-radius: 8px;
        }
        #meccgIcon._invisible {
            display: none;
        }
    ` + "</style>").appendTo("head");
}
renderHtml();
