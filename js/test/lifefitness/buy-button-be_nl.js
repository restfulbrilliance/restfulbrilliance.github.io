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
            domain: 'life-fitness-developement.myshopify.com',
            apiKey: '744e6ce87c4d962398a33ffa6c8b96f2',
            appId: '6',
        });

        ShopifyBuy.UI.onReady(client).then(function (ui) {
            ui.createComponent('product', {
                handle: ['PH-PCXEE-3WXXD-0107C'],
                node: document.getElementById('product-component-be_nl'),
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
                            "button": 'In de winkelmaand',
                            "outOfStock": 'Out of stock',
                            "unavailable": 'Unavailable',
                        },
                        "templates": {
                            "orderTime" : '<p class="{{data.classes.product.orderTime}}">Leveringstijd: ongeveer 2 tot 3 weken</p>',
                            "footer": '<footer class="{{data.classes.product.footer}}">'
                            + '<p>Heft u vragen? Wij helpen u graag verder! Bel 018 064 6706</p>'
                            + '<p class="footerTerms">Hier vindt u de <a class="footerLink" href="www.google.com">voorwaarden</a></p>'
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
                                "padding": "15px 54px",
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