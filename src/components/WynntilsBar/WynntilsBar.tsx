import TitleBar from "frameless-titlebar";
import React, { useEffect, useState } from "react";

function WynntilsBar() {

    return (
        <TitleBar
                title="Wynntils"
                theme={{
                    "bar": {
                        "palette": "dark",
                        "height": "28px",
                        "color": "#fff",
                        "background": "rgb(20, 20, 20)",
                        "borderBottom": "",
                        "inActiveOpacity": 0.6,
                        "fontFamily": "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Arial, sans-serif",
                        "icon": {
                        "color": "#0372ef",
                        "width": 18,
                        "height": 18
                        },
                        "title": {
                        "color": "inherit",
                        "align": "left",
                        "fontFamily": "inherit",
                        "fontWeight": "normal"
                        },
                        "button": {
                        "maxWidth": 100,
                        "disabledOpacity": 0.3,
                        "active": {
                            "color": "#fff",
                            "background": "#303030"
                        },
                        "default": {
                            "color": "inherit",
                            "background": "transparent"
                        },
                        "hover": {
                            "color": "inherit",
                            "background": "rgba(255,255,255,0.3)"
                        }
                        }
                    },
                    "controls": {
                        "border": "none",
                        "layout": "right",
                        "borderRadius": 0,
                        "normal": {
                            "default": {
                                "color": "inherit",
                                "background": "transparent"
                            },
                            "hover": {
                                "color": "#fff",
                                "background": "rgba(255,255,255,0.1)"
                            }
                        },
                        "close": {
                            "default": {
                                "color": "inherit",
                                "background": "transparent"
                            },
                            "hover": {
                                "color": "#fff",
                                "background": "#e81123"
                            }
                        }
                    },
                }}
            />
    )
}

export default WynntilsBar;