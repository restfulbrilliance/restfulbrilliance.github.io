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
                id: [9835082895],
                node: document.getElementById('product-component-93ffcfac9ff'),
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
                            "price": false,
                            "description": false,
                            "buttonWithQuantity": false,
                            "quantity": false,
                            "footer": true
                        },
                        "templates": {
                            "button": '<button class="{{data.classes.product.button}} {{data.buttonClass}}">' +
                            '{{data.buttonText}}' +
                            '<span class="{{data.classes.product.price}}">{{data.formattedPrice}}</span>' +
                            '</button>',
                            "footer": '<footer class="{{data.classes.product.footer}}">Please see <a href="www.google.com">terms and conditions</a></footer>'
                        },
                        "order": [
                            'button',
                            'footer',
                        ],
                        "classes": {
                            "footer": "product-footer",
                        },
                        "styles": {
                            "footer": {
                                "color": "grey",
                                "margin-top": "14.5px",
                            },
                            "product": {
                                "text-align": "left",
                                "@media (min-width: 601px)": {
                                    "max-width": "100%",
                                    "margin-left": "0",
                                    "margin-bottom": "50px"
                                }
                            },
                            "button": {
                                "background-color": "#4196b4",
                                "font-family": "Open Sans, sans-serif",
                                "font-size": "13px",
                                "padding": "15px 30px",
                                ":hover": {
                                    "background-color": "#3b87a2"
                                },
                                "border-radius": "2px",
                                ":focus": {
                                    "background-color": "#3b87a2"
                                },
                                "font-weight": "bold"
                            },
                            "price": {
                                "font-family": "Open Sans, sans-serif",
                                "font-size": "12px",
                                "font-weight": "normal",
                                "color": "white",
                                "padding-left": "7px",
                                "border-left" : "1px solid white",
                                "margin-left" : "7px"
                            },
                        },
                        "googleFonts": [
                            "Open Sans",
                            "Open Sans",
                            "Open Sans",
                            "Open Sans",
                            "Open Sans",
                            "Open Sans"
                        ]
                    },
                    "cart": {
                        "contents": {
                            "button": true
                        },
                        "styles": {
                            "button": {
                                "background-color": "#4196b4",
                                "font-family": "Open Sans, sans-serif",
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
                            "Open Sans"
                        ]
                    },
                    "modalProduct": {
                        "contents": {
                            "img": false,
                            "imgWithCarousel": true,
                            "variantTitle": false,
                            "buttonWithQuantity": true,
                            "button": false,
                            "quantity": false
                        },
                        "styles": {
                            "product": {
                                "@media (min-width: 601px)": {
                                    "max-width": "100%",
                                    "margin-left": "0px",
                                    "margin-bottom": "0px"
                                }
                            },
                            "button": {
                                "background-color": "#4196b4",
                                "font-family": "Open Sans, sans-serif",
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
                            "variantTitle": {
                                "font-family": "Open Sans, sans-serif",
                                "font-weight": "normal"
                            },
                            "title": {
                                "font-family": "Open Sans, sans-serif"
                            },
                            "description": {
                                "font-family": "Open Sans, sans-serif",
                                "font-weight": "normal"
                            },
                            "price": {
                                "font-family": "Open Sans, sans-serif",
                                "font-weight": "normal"
                            },
                            "quantityInput": {
                                "font-size": "13px",
                                "padding-top": "14.5px",
                                "padding-bottom": "14.5px"
                            },
                            "compareAt": {
                                "font-family": "Open Sans, sans-serif",
                                "font-weight": "normal"
                            }
                        },
                        "googleFonts": [
                            "Open Sans",
                            "Open Sans",
                            "Open Sans",
                            "Open Sans",
                            "Open Sans",
                            "Open Sans"
                        ]
                    },
                    "toggle": {
                        "styles": {
                            "toggle": {
                                "font-family": "Open Sans, sans-serif",
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
                            "Open Sans"
                        ]
                    },
                    "option": {
                        "styles": {
                            "label": {
                                "font-family": "Open Sans, sans-serif"
                            },
                            "select": {
                                "font-family": "Open Sans, sans-serif"
                            }
                        },
                        "googleFonts": [
                            "Open Sans",
                            "Open Sans"
                        ]
                    },
                    "productSet": {
                        "styles": {
                            "products": {
                                "@media (min-width: 601px)": {
                                    "margin-left": "-20px"
                                }
                            }
                        }
                    }
                }
            });
        });
    }
})();
        /*]]>*/