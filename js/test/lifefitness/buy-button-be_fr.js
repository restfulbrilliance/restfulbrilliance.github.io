/*<![CDATA[*/

(function () {
    var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    if (window.ShopifyBuy) {
        if (window.ShopifyBuy.UI) {
            ShopifyBuyInit();
        } else {
            loadScript();
        }
    } else {
        loadScript();
    }

    function loadScript() {
        var script = document.createElement('script');
        script.async = true;
        script.src = scriptURL;
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
        script.onload = ShopifyBuyInit;
    }

    function ShopifyBuyInit() {
        var client = ShopifyBuy.buildClient({
            domain: 'life-fitness-benelux-french.myshopify.com',
            apiKey: 'd0b26a91c2211da48381d7705ea3cb9a',
            appId: '6',
        });

        ShopifyBuy.UI.onReady(client).then(function (ui) {
            ui.createComponent('product', {
                handle: ['IC-LFIC6B1-01'],
                node: document.getElementById('product-component-be_fr'),
                moneyFormat: '%E2%82%AC%7B%7Bamount%7D%7D',
                options: {
                    "product": {
                        "variantId": "all",
                        "width": "240px",
                        "contents": {
                            "img": false,
                            "imgWithCarousel": false,
                            "title": false,
                            "variantTitle": false,
                            "price": true,
                            "orderTime" : true,
                            "description": false,
                            "buttonWithQuantity": false,
                            "quantity": false,
                            "footer": true
                        },
                        "text": {
                            "button": 'Ajouter au panier',
                            "outOfStock": 'Rupture de stock',
                            "unavailable": 'Produit indisponible',
                        },
                        "templates": {
                            "orderTime" : '<p class="{{data.classes.product.orderTime}}">Délai de livraison: 2-3 semaines</p>',
                            "footer": '<footer class="{{data.classes.product.footer}}">'
                            + '<p>En cas de questions, veuillez appeler<br/>0800 930 95</p>'
                            + '<p class="footerTerms">Vous trouverez ici les <a class="footerLink" href="https://www.lifefitness.nl/fr/shop-be-terms-and-conditions">conditions générales</a></p>'
                            + '</footer>'
                        },
                        "order": [
                            'price',
                            'orderTime',
                            'button',
                            'footer',
                        ],
                        "classes": {
                            "orderTime" : "product-orderTime",
                            "footer": "product-footer",
                            "footerTerms" : "footerTerms",
                            "footerLink": "footerLink"
                        },
                        "styles": {
                            "product": {
                                "text-align": "left",
                                "@media (min-width: 601px)": {
                                    "max-width": "100%",
                                    "margin-left": "0",
                                    "margin-bottom": "50px"
                                }
                            },
                            "prices": {
                                "margin": "0 0 5px 0"
                            },
                            "price": {
                                "font-family": "Lato, Helvetica Neue, Arial, sans-serif",
                                "font-size": "18px",
                                "font-weight": "bold",
                                "color": "black",
                            },
                            "orderTime":{
                                "margin": "0 0 10px 0"
                            },
                            "buttonWrapper" : {
                                "margin": "0 0 10px 0"
                            },
                            "button": {
                                "background-color": "#4196b4",
                                "font-family": "Lato, Helvetica Neue, Arial, sans-serif",
                                "font-size": "15px",
                                "padding": "15px 59px",
                                ":hover": {
                                    "background-color": "#3b87a2"
                                },
                                "border-radius": "1px",
                                ":focus": {
                                    "background-color": "#3b87a2"
                                }
                            },
                            "footer": {
                            },
                            "footerTerms" : {
                                "color": "grey",
                                "margin" : "5px 0 0 0"
                            },
                            "footerLink" : {
                                "color" : "grey"
                            }
                        },
                        "googleFonts": [
                            "Lato"
                        ]
                    },
                    "cart": {
                        "contents": {
                            "button": true
                        },
                        "text" : {
                            "title": "Panier",
                            "empty": "Votre panier est vide.",
                            "button": "Valider ma commande",
                            "total": "Total",
                            "currency": "EUR",
                            "notice": "La TVA est comprise dans le prix indiqué. Les frais de livraison seront mentionnés sur la facture après validation de votre commande sur le Site."
                        },
                        "styles": {
                            "button": {
                                "background-color": "#4196b4",
                                "font-family": "Lato, Helvetica Neue, Arial, sans-serif",
                                "font-size": "13px",
                                "padding-top": "14.5px",
                                "padding-bottom": "14.5px",
                                ":hover": {
                                    "background-color": "#3b87a2"
                                },
                                "border-radius": "2px",
                                ":focus": {
                                    "background-color": "#3b87a2"
                                },
                                "font-weight": "bold"
                            },
                            "footer": {
                                "background-color": "#ffffff"
                            }
                        },
                        "googleFonts": [
                            "Lato"
                        ]
                    },
                    "toggle": {
                        "styles": {
                            "toggle": {
                                "font-family": "Lato, Helvetica Neue, Arial, sans-serif",
                                "background-color": "#4196b4",
                                ":hover": {
                                    "background-color": "#3b87a2"
                                },
                                ":focus": {
                                    "background-color": "#3b87a2"
                                },
                                "font-weight": "bold"
                            },
                            "count": {
                                "font-size": "13px"
                            }
                        },
                        "googleFonts": [
                            "Lato"
                        ]
                    },
                    "option": {
                        "styles": {
                            "label": {
                                "font-family": "Lato, Helvetica Neue, Arial, sans-serif"
                            },
                            "select": {
                                "font-family": "Lato, Helvetica Neue, Arial, sans-serif"
                            }
                        },
                        "googleFonts": [
                            "Lato"
                        ]
                    },
                }
            });
        });
    }
})();
/*]]>*/