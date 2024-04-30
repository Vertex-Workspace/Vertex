'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">vertex documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-9fabe7c69653589a85dff29721e3f33f82608e71cb9cd20421b64cab4e2a2d8ad0d85ce13a0bc8c2a42def3e9348d5526293b7e76da521bad61770dcc1286f7d"' : 'data-bs-target="#xs-components-links-module-AppModule-9fabe7c69653589a85dff29721e3f33f82608e71cb9cd20421b64cab4e2a2d8ad0d85ce13a0bc8c2a42def3e9348d5526293b7e76da521bad61770dcc1286f7d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-9fabe7c69653589a85dff29721e3f33f82608e71cb9cd20421b64cab4e2a2d8ad0d85ce13a0bc8c2a42def3e9348d5526293b7e76da521bad61770dcc1286f7d"' :
                                            'id="xs-components-links-module-AppModule-9fabe7c69653589a85dff29721e3f33f82608e71cb9cd20421b64cab4e2a2d8ad0d85ce13a0bc8c2a42def3e9348d5526293b7e76da521bad61770dcc1286f7d"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeniedAccessComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeniedAccessComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InvitationPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InvitationPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoadingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoadingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MobileSidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MobileSidebarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VlibrasComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VlibrasComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-9fabe7c69653589a85dff29721e3f33f82608e71cb9cd20421b64cab4e2a2d8ad0d85ce13a0bc8c2a42def3e9348d5526293b7e76da521bad61770dcc1286f7d"' : 'data-bs-target="#xs-injectables-links-module-AppModule-9fabe7c69653589a85dff29721e3f33f82608e71cb9cd20421b64cab4e2a2d8ad0d85ce13a0bc8c2a42def3e9348d5526293b7e76da521bad61770dcc1286f7d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-9fabe7c69653589a85dff29721e3f33f82608e71cb9cd20421b64cab4e2a2d8ad0d85ce13a0bc8c2a42def3e9348d5526293b7e76da521bad61770dcc1286f7d"' :
                                        'id="xs-injectables-links-module-AppModule-9fabe7c69653589a85dff29721e3f33f82608e71cb9cd20421b64cab4e2a2d8ad0d85ce13a0bc8c2a42def3e9348d5526293b7e76da521bad61770dcc1286f7d"' }>
                                        <li class="link">
                                            <a href="injectables/AlertService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlertService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PersonalizationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PersonalizationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ButtonModule.html" data-type="entity-link" >ButtonModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ButtonModule-fb9a43e9ab173434a921289978257ecdb6d358098cda6063bf25122a832d2e21858537dcd73ba79fd9f0c732d444bd795c88711dd9e1297e029ab25079cb802b"' : 'data-bs-target="#xs-components-links-module-ButtonModule-fb9a43e9ab173434a921289978257ecdb6d358098cda6063bf25122a832d2e21858537dcd73ba79fd9f0c732d444bd795c88711dd9e1297e029ab25079cb802b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ButtonModule-fb9a43e9ab173434a921289978257ecdb6d358098cda6063bf25122a832d2e21858537dcd73ba79fd9f0c732d444bd795c88711dd9e1297e029ab25079cb802b"' :
                                            'id="xs-components-links-module-ButtonModule-fb9a43e9ab173434a921289978257ecdb6d358098cda6063bf25122a832d2e21858537dcd73ba79fd9f0c732d444bd795c88711dd9e1297e029ab25079cb802b"' }>
                                            <li class="link">
                                                <a href="components/ButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ButtonComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CalendarScreenModule.html" data-type="entity-link" >CalendarScreenModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CalendarScreenModule-2c61ecbda0cd08d72c7d2208e4b2ea777c6aff41f2184ff12f5d9818a43e3d265b445c37bc5ad4c64fcb0ba01e5544b6095da4d8da1574226bbd707523f7af3f"' : 'data-bs-target="#xs-components-links-module-CalendarScreenModule-2c61ecbda0cd08d72c7d2208e4b2ea777c6aff41f2184ff12f5d9818a43e3d265b445c37bc5ad4c64fcb0ba01e5544b6095da4d8da1574226bbd707523f7af3f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CalendarScreenModule-2c61ecbda0cd08d72c7d2208e4b2ea777c6aff41f2184ff12f5d9818a43e3d265b445c37bc5ad4c64fcb0ba01e5544b6095da4d8da1574226bbd707523f7af3f"' :
                                            'id="xs-components-links-module-CalendarScreenModule-2c61ecbda0cd08d72c7d2208e4b2ea777c6aff41f2184ff12f5d9818a43e3d265b445c37bc5ad4c64fcb0ba01e5544b6095da4d8da1574226bbd707523f7af3f"' }>
                                            <li class="link">
                                                <a href="components/CalendarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarRowCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarRowCardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CardGroupModule.html" data-type="entity-link" >CardGroupModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CardGroupModule-ec3e6de20500cfa669a73e6b74d3396c2b86f814d3d2e9636f7026e7ad1f22583a9ffeb8197024cf950813f0b9380b860304f44e06067892cef500edcb2d4637"' : 'data-bs-target="#xs-components-links-module-CardGroupModule-ec3e6de20500cfa669a73e6b74d3396c2b86f814d3d2e9636f7026e7ad1f22583a9ffeb8197024cf950813f0b9380b860304f44e06067892cef500edcb2d4637"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CardGroupModule-ec3e6de20500cfa669a73e6b74d3396c2b86f814d3d2e9636f7026e7ad1f22583a9ffeb8197024cf950813f0b9380b860304f44e06067892cef500edcb2d4637"' :
                                            'id="xs-components-links-module-CardGroupModule-ec3e6de20500cfa669a73e6b74d3396c2b86f814d3d2e9636f7026e7ad1f22583a9ffeb8197024cf950813f0b9380b860304f44e06067892cef500edcb2d4637"' }>
                                            <li class="link">
                                                <a href="components/CardGroupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardGroupComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CardListModule.html" data-type="entity-link" >CardListModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CardListModule-c59e6e97cf969f507ddd5491011028165499f7c49dbf43617b8177472f314a122d8e3e34f83c3569a692ecec349045f57c473c1600091166c04ae35624090293"' : 'data-bs-target="#xs-components-links-module-CardListModule-c59e6e97cf969f507ddd5491011028165499f7c49dbf43617b8177472f314a122d8e3e34f83c3569a692ecec349045f57c473c1600091166c04ae35624090293"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CardListModule-c59e6e97cf969f507ddd5491011028165499f7c49dbf43617b8177472f314a122d8e3e34f83c3569a692ecec349045f57c473c1600091166c04ae35624090293"' :
                                            'id="xs-components-links-module-CardListModule-c59e6e97cf969f507ddd5491011028165499f7c49dbf43617b8177472f314a122d8e3e34f83c3569a692ecec349045f57c473c1600091166c04ae35624090293"' }>
                                            <li class="link">
                                                <a href="components/CardListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CardModule.html" data-type="entity-link" >CardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CardModule-c1b7ca017f24950ce2c6c3a477e73df81b8b9764427772a65c5640df1992028bf70f555e1ddac6983bae34fb0a52176dc2799f642aa5b37491fc176091fafb61"' : 'data-bs-target="#xs-components-links-module-CardModule-c1b7ca017f24950ce2c6c3a477e73df81b8b9764427772a65c5640df1992028bf70f555e1ddac6983bae34fb0a52176dc2799f642aa5b37491fc176091fafb61"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CardModule-c1b7ca017f24950ce2c6c3a477e73df81b8b9764427772a65c5640df1992028bf70f555e1ddac6983bae34fb0a52176dc2799f642aa5b37491fc176091fafb61"' :
                                            'id="xs-components-links-module-CardModule-c1b7ca017f24950ce2c6c3a477e73df81b8b9764427772a65c5640df1992028bf70f555e1ddac6983bae34fb0a52176dc2799f642aa5b37491fc176091fafb61"' }>
                                            <li class="link">
                                                <a href="components/CardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CardUserModule.html" data-type="entity-link" >CardUserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CardUserModule-31e5fa6996cf69f8f4155294574812ecc6897082efb89a5bb2b1b764f981cf6e44165c37710148e7e1066ef6be0e502f14a143130fd733faae87850f2d05ddab"' : 'data-bs-target="#xs-components-links-module-CardUserModule-31e5fa6996cf69f8f4155294574812ecc6897082efb89a5bb2b1b764f981cf6e44165c37710148e7e1066ef6be0e502f14a143130fd733faae87850f2d05ddab"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CardUserModule-31e5fa6996cf69f8f4155294574812ecc6897082efb89a5bb2b1b764f981cf6e44165c37710148e7e1066ef6be0e502f14a143130fd733faae87850f2d05ddab"' :
                                            'id="xs-components-links-module-CardUserModule-31e5fa6996cf69f8f4155294574812ecc6897082efb89a5bb2b1b764f981cf6e44165c37710148e7e1066ef6be0e502f14a143130fd733faae87850f2d05ddab"' }>
                                            <li class="link">
                                                <a href="components/CardUserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardUserComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChatModule.html" data-type="entity-link" >ChatModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ChatModule-439aaf9f33fff0cd1e08942740247c06e208d62d08e7f31bb450d51e87b287500f5a7a7d9325e1187da2699161e7e7c94155ec233482cf0f964a65a570fcf330"' : 'data-bs-target="#xs-components-links-module-ChatModule-439aaf9f33fff0cd1e08942740247c06e208d62d08e7f31bb450d51e87b287500f5a7a7d9325e1187da2699161e7e7c94155ec233482cf0f964a65a570fcf330"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ChatModule-439aaf9f33fff0cd1e08942740247c06e208d62d08e7f31bb450d51e87b287500f5a7a7d9325e1187da2699161e7e7c94155ec233482cf0f964a65a570fcf330"' :
                                            'id="xs-components-links-module-ChatModule-439aaf9f33fff0cd1e08942740247c06e208d62d08e7f31bb450d51e87b287500f5a7a7d9325e1187da2699161e7e7c94155ec233482cf0f964a65a570fcf330"' }>
                                            <li class="link">
                                                <a href="components/ChatComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ColorsModule.html" data-type="entity-link" >ColorsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ColorsModule-264f1e99f6262de8b3a28fa696bd6b6fde2970797f5519dcd8d79c38c1b9e7ae65f76deea2d5736138190e2083b1f11d7220045e88d7603f1f6003d0115670c6"' : 'data-bs-target="#xs-components-links-module-ColorsModule-264f1e99f6262de8b3a28fa696bd6b6fde2970797f5519dcd8d79c38c1b9e7ae65f76deea2d5736138190e2083b1f11d7220045e88d7603f1f6003d0115670c6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ColorsModule-264f1e99f6262de8b3a28fa696bd6b6fde2970797f5519dcd8d79c38c1b9e7ae65f76deea2d5736138190e2083b1f11d7220045e88d7603f1f6003d0115670c6"' :
                                            'id="xs-components-links-module-ColorsModule-264f1e99f6262de8b3a28fa696bd6b6fde2970797f5519dcd8d79c38c1b9e7ae65f76deea2d5736138190e2083b1f11d7220045e88d7603f1f6003d0115670c6"' }>
                                            <li class="link">
                                                <a href="components/ColorsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ColorsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ConfirmModalModule.html" data-type="entity-link" >ConfirmModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ConfirmModalModule-bbdaa0bcd4f6eb9f07b13e3d95c815b277da3dd3f0fcf5d73986aa49d6016448402a95ae267c1edb4edaa96a8fb553adaeb0adc1312b9935ffaf1688d4b7c38c"' : 'data-bs-target="#xs-components-links-module-ConfirmModalModule-bbdaa0bcd4f6eb9f07b13e3d95c815b277da3dd3f0fcf5d73986aa49d6016448402a95ae267c1edb4edaa96a8fb553adaeb0adc1312b9935ffaf1688d4b7c38c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ConfirmModalModule-bbdaa0bcd4f6eb9f07b13e3d95c815b277da3dd3f0fcf5d73986aa49d6016448402a95ae267c1edb4edaa96a8fb553adaeb0adc1312b9935ffaf1688d4b7c38c"' :
                                            'id="xs-components-links-module-ConfirmModalModule-bbdaa0bcd4f6eb9f07b13e3d95c815b277da3dd3f0fcf5d73986aa49d6016448402a95ae267c1edb4edaa96a8fb553adaeb0adc1312b9935ffaf1688d4b7c38c"' }>
                                            <li class="link">
                                                <a href="components/ConfirmModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfirmModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CreateGroupModule.html" data-type="entity-link" >CreateGroupModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CreateGroupModule-16acc00844e6a1522042555df594e6e16a761e818ab0aeef1069fc916c94c66bd7d96fcbb65717ac2343c9ee8cb02c10d1c4b3740c9c40ae150715d88316d284"' : 'data-bs-target="#xs-components-links-module-CreateGroupModule-16acc00844e6a1522042555df594e6e16a761e818ab0aeef1069fc916c94c66bd7d96fcbb65717ac2343c9ee8cb02c10d1c4b3740c9c40ae150715d88316d284"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CreateGroupModule-16acc00844e6a1522042555df594e6e16a761e818ab0aeef1069fc916c94c66bd7d96fcbb65717ac2343c9ee8cb02c10d1c4b3740c9c40ae150715d88316d284"' :
                                            'id="xs-components-links-module-CreateGroupModule-16acc00844e6a1522042555df594e6e16a761e818ab0aeef1069fc916c94c66bd7d96fcbb65717ac2343c9ee8cb02c10d1c4b3740c9c40ae150715d88316d284"' }>
                                            <li class="link">
                                                <a href="components/CreateGroupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateGroupComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CreateTeamProjectModule.html" data-type="entity-link" >CreateTeamProjectModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CreateTeamProjectModule-887edf63d534c295aedfc36816793c9c7e978298602b83b77c362511f22488ec7af314cbf3e2b2e89fecf8844b3153d229ea6b880c10b9a4c32698d39705691c"' : 'data-bs-target="#xs-components-links-module-CreateTeamProjectModule-887edf63d534c295aedfc36816793c9c7e978298602b83b77c362511f22488ec7af314cbf3e2b2e89fecf8844b3153d229ea6b880c10b9a4c32698d39705691c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CreateTeamProjectModule-887edf63d534c295aedfc36816793c9c7e978298602b83b77c362511f22488ec7af314cbf3e2b2e89fecf8844b3153d229ea6b880c10b9a4c32698d39705691c"' :
                                            'id="xs-components-links-module-CreateTeamProjectModule-887edf63d534c295aedfc36816793c9c7e978298602b83b77c362511f22488ec7af314cbf3e2b2e89fecf8844b3153d229ea6b880c10b9a4c32698d39705691c"' }>
                                            <li class="link">
                                                <a href="components/CreateTeamProjectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateTeamProjectComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DeletedModule.html" data-type="entity-link" >DeletedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DeletedModule-61d5c82015e4b73f282faae1cf385ff6c657a98b7a570d9902dbf323c919fb9e814bf0923175411f0f4d076fb55fd605d44113fbce5f0f25d379fad1ea41fa4a"' : 'data-bs-target="#xs-components-links-module-DeletedModule-61d5c82015e4b73f282faae1cf385ff6c657a98b7a570d9902dbf323c919fb9e814bf0923175411f0f4d076fb55fd605d44113fbce5f0f25d379fad1ea41fa4a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DeletedModule-61d5c82015e4b73f282faae1cf385ff6c657a98b7a570d9902dbf323c919fb9e814bf0923175411f0f4d076fb55fd605d44113fbce5f0f25d379fad1ea41fa4a"' :
                                            'id="xs-components-links-module-DeletedModule-61d5c82015e4b73f282faae1cf385ff6c657a98b7a570d9902dbf323c919fb9e814bf0923175411f0f4d076fb55fd605d44113fbce5f0f25d379fad1ea41fa4a"' }>
                                            <li class="link">
                                                <a href="components/DeletedComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeletedComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DeniedAccessModule.html" data-type="entity-link" >DeniedAccessModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EditPropertiesModule.html" data-type="entity-link" >EditPropertiesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-EditPropertiesModule-4153418c9209510418bff1565b5ee1244d394b54eb16a4932e04555dca0fbd657d0ce17eea8f79970ba4dceede81304ea2f976a04a2fb88d8e16871be0920dc1"' : 'data-bs-target="#xs-components-links-module-EditPropertiesModule-4153418c9209510418bff1565b5ee1244d394b54eb16a4932e04555dca0fbd657d0ce17eea8f79970ba4dceede81304ea2f976a04a2fb88d8e16871be0920dc1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EditPropertiesModule-4153418c9209510418bff1565b5ee1244d394b54eb16a4932e04555dca0fbd657d0ce17eea8f79970ba4dceede81304ea2f976a04a2fb88d8e16871be0920dc1"' :
                                            'id="xs-components-links-module-EditPropertiesModule-4153418c9209510418bff1565b5ee1244d394b54eb16a4932e04555dca0fbd657d0ce17eea8f79970ba4dceede81304ea2f976a04a2fb88d8e16871be0920dc1"' }>
                                            <li class="link">
                                                <a href="components/EditPropertiesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditPropertiesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ForgotPasswordModule.html" data-type="entity-link" >ForgotPasswordModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ForgotPasswordModule-bf87b8c310a2e8960452f619a67b20eec2ba48e6a48dbd8c7287891acc1933d2dc861e4896afe9e0572bd2431da86abf7a9d1fe691929c2e659e4a76da661007"' : 'data-bs-target="#xs-components-links-module-ForgotPasswordModule-bf87b8c310a2e8960452f619a67b20eec2ba48e6a48dbd8c7287891acc1933d2dc861e4896afe9e0572bd2431da86abf7a9d1fe691929c2e659e4a76da661007"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ForgotPasswordModule-bf87b8c310a2e8960452f619a67b20eec2ba48e6a48dbd8c7287891acc1933d2dc861e4896afe9e0572bd2431da86abf7a9d1fe691929c2e659e4a76da661007"' :
                                            'id="xs-components-links-module-ForgotPasswordModule-bf87b8c310a2e8960452f619a67b20eec2ba48e6a48dbd8c7287891acc1933d2dc861e4896afe9e0572bd2431da86abf7a9d1fe691929c2e659e4a76da661007"' }>
                                            <li class="link">
                                                <a href="components/ForgotPasswordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ForgotPasswordComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GeneralPropertiesModule.html" data-type="entity-link" >GeneralPropertiesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-GeneralPropertiesModule-e3262c66a86f1626904eb92e13f7e5af82b5cd29c06c3d097cfab489760fdf2d854a419fdb11e1818ddb3837e04c8cbc441e02e4369e5caa8990584d29f0838d"' : 'data-bs-target="#xs-components-links-module-GeneralPropertiesModule-e3262c66a86f1626904eb92e13f7e5af82b5cd29c06c3d097cfab489760fdf2d854a419fdb11e1818ddb3837e04c8cbc441e02e4369e5caa8990584d29f0838d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GeneralPropertiesModule-e3262c66a86f1626904eb92e13f7e5af82b5cd29c06c3d097cfab489760fdf2d854a419fdb11e1818ddb3837e04c8cbc441e02e4369e5caa8990584d29f0838d"' :
                                            'id="xs-components-links-module-GeneralPropertiesModule-e3262c66a86f1626904eb92e13f7e5af82b5cd29c06c3d097cfab489760fdf2d854a419fdb11e1818ddb3837e04c8cbc441e02e4369e5caa8990584d29f0838d"' }>
                                            <li class="link">
                                                <a href="components/GeneralPropertiesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GeneralPropertiesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GroupsSelectModule.html" data-type="entity-link" >GroupsSelectModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-GroupsSelectModule-e39f1ca0b7437e4608eca64452c07a6ab36dda3a238abbe5b31772c449d6791f942537feb7d4cb7162c84c0fa820b4783ddff63d1ff5f085c2f70cc1fbfc414f"' : 'data-bs-target="#xs-components-links-module-GroupsSelectModule-e39f1ca0b7437e4608eca64452c07a6ab36dda3a238abbe5b31772c449d6791f942537feb7d4cb7162c84c0fa820b4783ddff63d1ff5f085c2f70cc1fbfc414f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GroupsSelectModule-e39f1ca0b7437e4608eca64452c07a6ab36dda3a238abbe5b31772c449d6791f942537feb7d4cb7162c84c0fa820b4783ddff63d1ff5f085c2f70cc1fbfc414f"' :
                                            'id="xs-components-links-module-GroupsSelectModule-e39f1ca0b7437e4608eca64452c07a6ab36dda3a238abbe5b31772c449d6791f942537feb7d4cb7162c84c0fa820b4783ddff63d1ff5f085c2f70cc1fbfc414f"' }>
                                            <li class="link">
                                                <a href="components/GroupsSelectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GroupsSelectComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HeaderModule.html" data-type="entity-link" >HeaderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HeaderModule-7a4d61ddacc0d041ac81af7ca08424119fa5bdc2d1733b3cfd90bdf3e7cbfe4f39e8ad31eee68b4dca4825a644cc66b4e99383327123d74a9cdbdb833e792b82"' : 'data-bs-target="#xs-components-links-module-HeaderModule-7a4d61ddacc0d041ac81af7ca08424119fa5bdc2d1733b3cfd90bdf3e7cbfe4f39e8ad31eee68b4dca4825a644cc66b4e99383327123d74a9cdbdb833e792b82"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HeaderModule-7a4d61ddacc0d041ac81af7ca08424119fa5bdc2d1733b3cfd90bdf3e7cbfe4f39e8ad31eee68b4dca4825a644cc66b4e99383327123d74a9cdbdb833e792b82"' :
                                            'id="xs-components-links-module-HeaderModule-7a4d61ddacc0d041ac81af7ca08424119fa5bdc2d1733b3cfd90bdf3e7cbfe4f39e8ad31eee68b4dca4825a644cc66b4e99383327123d74a9cdbdb833e792b82"' }>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link" >HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HomeModule-e2be2b8cd722916ef3643eed1604e29d467f5f665113a07db1bea412c9a77ea02c0b52b98cfd628e6398b5ba43606f1d7d0185d1336167a7d439d80bfe40bda0"' : 'data-bs-target="#xs-components-links-module-HomeModule-e2be2b8cd722916ef3643eed1604e29d467f5f665113a07db1bea412c9a77ea02c0b52b98cfd628e6398b5ba43606f1d7d0185d1336167a7d439d80bfe40bda0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-e2be2b8cd722916ef3643eed1604e29d467f5f665113a07db1bea412c9a77ea02c0b52b98cfd628e6398b5ba43606f1d7d0185d1336167a7d439d80bfe40bda0"' :
                                            'id="xs-components-links-module-HomeModule-e2be2b8cd722916ef3643eed1604e29d467f5f665113a07db1bea412c9a77ea02c0b52b98cfd628e6398b5ba43606f1d7d0185d1336167a7d439d80bfe40bda0"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/InputModule.html" data-type="entity-link" >InputModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-InputModule-9d86c8e6522978e082678bdd236a09334434b5263c0d218d5f9994194ff7cde322d24ff561d22d22bb133298726c68cfc749f92ecccd13452169d155ab994a95"' : 'data-bs-target="#xs-components-links-module-InputModule-9d86c8e6522978e082678bdd236a09334434b5263c0d218d5f9994194ff7cde322d24ff561d22d22bb133298726c68cfc749f92ecccd13452169d155ab994a95"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InputModule-9d86c8e6522978e082678bdd236a09334434b5263c0d218d5f9994194ff7cde322d24ff561d22d22bb133298726c68cfc749f92ecccd13452169d155ab994a95"' :
                                            'id="xs-components-links-module-InputModule-9d86c8e6522978e082678bdd236a09334434b5263c0d218d5f9994194ff7cde322d24ff561d22d22bb133298726c68cfc749f92ecccd13452169d155ab994a95"' }>
                                            <li class="link">
                                                <a href="components/InputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InputComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/InputValuePropertyModule.html" data-type="entity-link" >InputValuePropertyModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-InputValuePropertyModule-3ce98e521e928f788255f3b44460085b8e6104ae69f71d17c1ff94e9387323159397053357d7a252ca349ab27255ec72e95052c958152e5d54091c7138999576"' : 'data-bs-target="#xs-components-links-module-InputValuePropertyModule-3ce98e521e928f788255f3b44460085b8e6104ae69f71d17c1ff94e9387323159397053357d7a252ca349ab27255ec72e95052c958152e5d54091c7138999576"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InputValuePropertyModule-3ce98e521e928f788255f3b44460085b8e6104ae69f71d17c1ff94e9387323159397053357d7a252ca349ab27255ec72e95052c958152e5d54091c7138999576"' :
                                            'id="xs-components-links-module-InputValuePropertyModule-3ce98e521e928f788255f3b44460085b8e6104ae69f71d17c1ff94e9387323159397053357d7a252ca349ab27255ec72e95052c958152e5d54091c7138999576"' }>
                                            <li class="link">
                                                <a href="components/InputValuePropertyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InputValuePropertyComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ItemsSelectionModule.html" data-type="entity-link" >ItemsSelectionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ItemsSelectionModule-3276f07622c6cd1f0891c8367fbe8391d593f8604bfca870243cbdd47e19f95fd9d821bf5309f5432e40d9bb6b36a438129db5b6f284253d4471b77ff94ffeeb"' : 'data-bs-target="#xs-components-links-module-ItemsSelectionModule-3276f07622c6cd1f0891c8367fbe8391d593f8604bfca870243cbdd47e19f95fd9d821bf5309f5432e40d9bb6b36a438129db5b6f284253d4471b77ff94ffeeb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ItemsSelectionModule-3276f07622c6cd1f0891c8367fbe8391d593f8604bfca870243cbdd47e19f95fd9d821bf5309f5432e40d9bb6b36a438129db5b6f284253d4471b77ff94ffeeb"' :
                                            'id="xs-components-links-module-ItemsSelectionModule-3276f07622c6cd1f0891c8367fbe8391d593f8604bfca870243cbdd47e19f95fd9d821bf5309f5432e40d9bb6b36a438129db5b6f284253d4471b77ff94ffeeb"' }>
                                            <li class="link">
                                                <a href="components/ItemsSelectionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemsSelectionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/KanbanModule.html" data-type="entity-link" >KanbanModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-KanbanModule-a28f889d46ae7b7e71d2a167697b33691c96994303c6cb565cf19ffe2a09ea4765a12aa3026d158290807a835b436a4ee486ef350c7dd03a86a9095b86e44df2"' : 'data-bs-target="#xs-components-links-module-KanbanModule-a28f889d46ae7b7e71d2a167697b33691c96994303c6cb565cf19ffe2a09ea4765a12aa3026d158290807a835b436a4ee486ef350c7dd03a86a9095b86e44df2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-KanbanModule-a28f889d46ae7b7e71d2a167697b33691c96994303c6cb565cf19ffe2a09ea4765a12aa3026d158290807a835b436a4ee486ef350c7dd03a86a9095b86e44df2"' :
                                            'id="xs-components-links-module-KanbanModule-a28f889d46ae7b7e71d2a167697b33691c96994303c6cb565cf19ffe2a09ea4765a12aa3026d158290807a835b436a4ee486ef350c7dd03a86a9095b86e44df2"' }>
                                            <li class="link">
                                                <a href="components/KanbanComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >KanbanComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ListModule.html" data-type="entity-link" >ListModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ListModule-59bbb88e22f26fab9fec5a79ab8ae833612b2a0b3114f08e13a0b7faef59ff03db634241e13c56b4bab4692ddbc80426e1dda9538d069e7433b32f1b5d94754d"' : 'data-bs-target="#xs-components-links-module-ListModule-59bbb88e22f26fab9fec5a79ab8ae833612b2a0b3114f08e13a0b7faef59ff03db634241e13c56b4bab4692ddbc80426e1dda9538d069e7433b32f1b5d94754d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ListModule-59bbb88e22f26fab9fec5a79ab8ae833612b2a0b3114f08e13a0b7faef59ff03db634241e13c56b4bab4692ddbc80426e1dda9538d069e7433b32f1b5d94754d"' :
                                            'id="xs-components-links-module-ListModule-59bbb88e22f26fab9fec5a79ab8ae833612b2a0b3114f08e13a0b7faef59ff03db634241e13c56b4bab4692ddbc80426e1dda9538d069e7433b32f1b5d94754d"' }>
                                            <li class="link">
                                                <a href="components/ListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginModule.html" data-type="entity-link" >LoginModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LoginModule-58cceb23375a02a3f3c52e419cca5115435e09faadcced6050effb3440e705fab6bf483ed83f620bc0030aa557538200fd535571b7714538652ef8cdc7a140e2"' : 'data-bs-target="#xs-components-links-module-LoginModule-58cceb23375a02a3f3c52e419cca5115435e09faadcced6050effb3440e705fab6bf483ed83f620bc0030aa557538200fd535571b7714538652ef8cdc7a140e2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginModule-58cceb23375a02a3f3c52e419cca5115435e09faadcced6050effb3440e705fab6bf483ed83f620bc0030aa557538200fd535571b7714538652ef8cdc7a140e2"' :
                                            'id="xs-components-links-module-LoginModule-58cceb23375a02a3f3c52e419cca5115435e09faadcced6050effb3440e705fab6bf483ed83f620bc0030aa557538200fd535571b7714538652ef8cdc7a140e2"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MinichatModule.html" data-type="entity-link" >MinichatModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-MinichatModule-187bc0f42978fb757380a206ce88dbd72201fb641b0483d4011a447be3d0d8aac6840a302557236433d3ce2281f3c7582d211aaf2f1511e73d7e308dfb4bd899"' : 'data-bs-target="#xs-components-links-module-MinichatModule-187bc0f42978fb757380a206ce88dbd72201fb641b0483d4011a447be3d0d8aac6840a302557236433d3ce2281f3c7582d211aaf2f1511e73d7e308dfb4bd899"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MinichatModule-187bc0f42978fb757380a206ce88dbd72201fb641b0483d4011a447be3d0d8aac6840a302557236433d3ce2281f3c7582d211aaf2f1511e73d7e308dfb4bd899"' :
                                            'id="xs-components-links-module-MinichatModule-187bc0f42978fb757380a206ce88dbd72201fb641b0483d4011a447be3d0d8aac6840a302557236433d3ce2281f3c7582d211aaf2f1511e73d7e308dfb4bd899"' }>
                                            <li class="link">
                                                <a href="components/MinichatComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MinichatComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MinichatTASKModule.html" data-type="entity-link" >MinichatTASKModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-MinichatTASKModule-5e16ebe21485277827be8c74e19310072ec816e6453acbc62691607cd8f0e27ae2f0da3352c7de233825b6996f5fdb840dcac10d6ac311d7955ab304c3378b85"' : 'data-bs-target="#xs-components-links-module-MinichatTASKModule-5e16ebe21485277827be8c74e19310072ec816e6453acbc62691607cd8f0e27ae2f0da3352c7de233825b6996f5fdb840dcac10d6ac311d7955ab304c3378b85"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MinichatTASKModule-5e16ebe21485277827be8c74e19310072ec816e6453acbc62691607cd8f0e27ae2f0da3352c7de233825b6996f5fdb840dcac10d6ac311d7955ab304c3378b85"' :
                                            'id="xs-components-links-module-MinichatTASKModule-5e16ebe21485277827be8c74e19310072ec816e6453acbc62691607cd8f0e27ae2f0da3352c7de233825b6996f5fdb840dcac10d6ac311d7955ab304c3378b85"' }>
                                            <li class="link">
                                                <a href="components/MinichatTASKComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MinichatTASKComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ModalPropertiesModule.html" data-type="entity-link" >ModalPropertiesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ModalPropertiesModule-1ba8a1fe02795169b33f2db0ab7f103a66853e8f97167c70dfca7da5f8dff80b7b5d9f176e42f41fc25d1a0a9e676d32b65da88d2a30352e0720574cd253fefb"' : 'data-bs-target="#xs-components-links-module-ModalPropertiesModule-1ba8a1fe02795169b33f2db0ab7f103a66853e8f97167c70dfca7da5f8dff80b7b5d9f176e42f41fc25d1a0a9e676d32b65da88d2a30352e0720574cd253fefb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ModalPropertiesModule-1ba8a1fe02795169b33f2db0ab7f103a66853e8f97167c70dfca7da5f8dff80b7b5d9f176e42f41fc25d1a0a9e676d32b65da88d2a30352e0720574cd253fefb"' :
                                            'id="xs-components-links-module-ModalPropertiesModule-1ba8a1fe02795169b33f2db0ab7f103a66853e8f97167c70dfca7da5f8dff80b7b5d9f176e42f41fc25d1a0a9e676d32b65da88d2a30352e0720574cd253fefb"' }>
                                            <li class="link">
                                                <a href="components/ModalPropertiesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModalPropertiesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ModalWarnModule.html" data-type="entity-link" >ModalWarnModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ModalWarnModule-ef193e4c8f421fadeb4c26f9eddf4fdf6e36ab9690f3e04348f46664768985ff3bea249c93a6212c2fd6947c175ef5b61a2574e1930a90f999ecb6bb7b8e9ba0"' : 'data-bs-target="#xs-components-links-module-ModalWarnModule-ef193e4c8f421fadeb4c26f9eddf4fdf6e36ab9690f3e04348f46664768985ff3bea249c93a6212c2fd6947c175ef5b61a2574e1930a90f999ecb6bb7b8e9ba0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ModalWarnModule-ef193e4c8f421fadeb4c26f9eddf4fdf6e36ab9690f3e04348f46664768985ff3bea249c93a6212c2fd6947c175ef5b61a2574e1930a90f999ecb6bb7b8e9ba0"' :
                                            'id="xs-components-links-module-ModalWarnModule-ef193e4c8f421fadeb4c26f9eddf4fdf6e36ab9690f3e04348f46664768985ff3bea249c93a6212c2fd6947c175ef5b61a2574e1930a90f999ecb6bb7b8e9ba0"' }>
                                            <li class="link">
                                                <a href="components/ModalWarnComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModalWarnComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NoteModalModule.html" data-type="entity-link" >NoteModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-NoteModalModule-3add0c0b335344b6e8e8f2ac6fa451e322f3a627c3bc48f33832fcad59aa2f84a2fb93a54362ac6f3721f1e37f0c2d7145e4c686c12f04e1899c4c285b2d4c15"' : 'data-bs-target="#xs-components-links-module-NoteModalModule-3add0c0b335344b6e8e8f2ac6fa451e322f3a627c3bc48f33832fcad59aa2f84a2fb93a54362ac6f3721f1e37f0c2d7145e4c686c12f04e1899c4c285b2d4c15"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NoteModalModule-3add0c0b335344b6e8e8f2ac6fa451e322f3a627c3bc48f33832fcad59aa2f84a2fb93a54362ac6f3721f1e37f0c2d7145e4c686c12f04e1899c4c285b2d4c15"' :
                                            'id="xs-components-links-module-NoteModalModule-3add0c0b335344b6e8e8f2ac6fa451e322f3a627c3bc48f33832fcad59aa2f84a2fb93a54362ac6f3721f1e37f0c2d7145e4c686c12f04e1899c4c285b2d4c15"' }>
                                            <li class="link">
                                                <a href="components/NoteModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NoteModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NoteModule.html" data-type="entity-link" >NoteModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-NoteModule-eca7c891b030d03b3efbe99eb617ff03781ed3cd805ed0ef80cff85d8cebe8880714c414884b7347e3f12bbbfcdd310d5bd9a8288ed71a008b989735f7c8362e"' : 'data-bs-target="#xs-components-links-module-NoteModule-eca7c891b030d03b3efbe99eb617ff03781ed3cd805ed0ef80cff85d8cebe8880714c414884b7347e3f12bbbfcdd310d5bd9a8288ed71a008b989735f7c8362e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NoteModule-eca7c891b030d03b3efbe99eb617ff03781ed3cd805ed0ef80cff85d8cebe8880714c414884b7347e3f12bbbfcdd310d5bd9a8288ed71a008b989735f7c8362e"' :
                                            'id="xs-components-links-module-NoteModule-eca7c891b030d03b3efbe99eb617ff03781ed3cd805ed0ef80cff85d8cebe8880714c414884b7347e3f12bbbfcdd310d5bd9a8288ed71a008b989735f7c8362e"' }>
                                            <li class="link">
                                                <a href="components/NoteComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NoteComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NotificationModule.html" data-type="entity-link" >NotificationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-NotificationModule-aada1e80ae1d651d09a98715bce3601ae203d787dc00787ecd935415fc3c3d450beb49e60772dfde6e03648c1b4eeeab4a309d474a045ce210c5706ba757145a"' : 'data-bs-target="#xs-components-links-module-NotificationModule-aada1e80ae1d651d09a98715bce3601ae203d787dc00787ecd935415fc3c3d450beb49e60772dfde6e03648c1b4eeeab4a309d474a045ce210c5706ba757145a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NotificationModule-aada1e80ae1d651d09a98715bce3601ae203d787dc00787ecd935415fc3c3d450beb49e60772dfde6e03648c1b4eeeab4a309d474a045ce210c5706ba757145a"' :
                                            'id="xs-components-links-module-NotificationModule-aada1e80ae1d651d09a98715bce3601ae203d787dc00787ecd935415fc3c3d450beb49e60772dfde6e03648c1b4eeeab4a309d474a045ce210c5706ba757145a"' }>
                                            <li class="link">
                                                <a href="components/NotificationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PipesModule.html" data-type="entity-link" >PipesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-PipesModule-8aa139d7361da2ab243bb47eb28fb4b5b9658177f3249e5bfe286eedd288b9460e201ef8dfbfe2da36276fd9ce3a2921217b2003da78855d093138798f1da948"' : 'data-bs-target="#xs-pipes-links-module-PipesModule-8aa139d7361da2ab243bb47eb28fb4b5b9658177f3249e5bfe286eedd288b9460e201ef8dfbfe2da36276fd9ce3a2921217b2003da78855d093138798f1da948"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-PipesModule-8aa139d7361da2ab243bb47eb28fb4b5b9658177f3249e5bfe286eedd288b9460e201ef8dfbfe2da36276fd9ce3a2921217b2003da78855d093138798f1da948"' :
                                            'id="xs-pipes-links-module-PipesModule-8aa139d7361da2ab243bb47eb28fb4b5b9658177f3249e5bfe286eedd288b9460e201ef8dfbfe2da36276fd9ce3a2921217b2003da78855d093138798f1da948"' }>
                                            <li class="link">
                                                <a href="pipes/DatePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/DateSortPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DateSortPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/NamePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NamePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/NameSortPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NameSortPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/SearchAllFilterPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchAllFilterPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/SimplePropertyPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SimplePropertyPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/StatusBasicPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatusBasicPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/StatusPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatusPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/StatusSortPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatusSortPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/UsernamePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsernamePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileModule.html" data-type="entity-link" >ProfileModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ProfileModule-90fb3b86ba2c33536f61166750b3997bbd4212c5d4d18367d0706305901ce4feded7f897d0395081c2009333cab9709144b24dc8348696d20b31de4ee0cc4f76"' : 'data-bs-target="#xs-components-links-module-ProfileModule-90fb3b86ba2c33536f61166750b3997bbd4212c5d4d18367d0706305901ce4feded7f897d0395081c2009333cab9709144b24dc8348696d20b31de4ee0cc4f76"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfileModule-90fb3b86ba2c33536f61166750b3997bbd4212c5d4d18367d0706305901ce4feded7f897d0395081c2009333cab9709144b24dc8348696d20b31de4ee0cc4f76"' :
                                            'id="xs-components-links-module-ProfileModule-90fb3b86ba2c33536f61166750b3997bbd4212c5d4d18367d0706305901ce4feded7f897d0395081c2009333cab9709144b24dc8348696d20b31de4ee0cc4f76"' }>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProjectsModule.html" data-type="entity-link" >ProjectsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ProjectsModule-7ac5f4268986a220e079408046e7196d54a058d4a09dc50fc797acf5caad922919f4b5685ae4652d1f6920cf3b4fe95e4f32ad01755982da84203c6b89b2ef2d"' : 'data-bs-target="#xs-components-links-module-ProjectsModule-7ac5f4268986a220e079408046e7196d54a058d4a09dc50fc797acf5caad922919f4b5685ae4652d1f6920cf3b4fe95e4f32ad01755982da84203c6b89b2ef2d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProjectsModule-7ac5f4268986a220e079408046e7196d54a058d4a09dc50fc797acf5caad922919f4b5685ae4652d1f6920cf3b4fe95e4f32ad01755982da84203c6b89b2ef2d"' :
                                            'id="xs-components-links-module-ProjectsModule-7ac5f4268986a220e079408046e7196d54a058d4a09dc50fc797acf5caad922919f4b5685ae4652d1f6920cf3b4fe95e4f32ad01755982da84203c6b89b2ef2d"' }>
                                            <li class="link">
                                                <a href="components/ProjectsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProjectsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PropertiesModule.html" data-type="entity-link" >PropertiesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PropertiesModule-498fcbb6c87a1e265dc2823440923c271b15a3687ef03bbc6e0e924344cf01617bd0aa4d57da22e7b890dd1f11bf1683f6bd42b7f43e66869bf76218d54f4fe5"' : 'data-bs-target="#xs-components-links-module-PropertiesModule-498fcbb6c87a1e265dc2823440923c271b15a3687ef03bbc6e0e924344cf01617bd0aa4d57da22e7b890dd1f11bf1683f6bd42b7f43e66869bf76218d54f4fe5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PropertiesModule-498fcbb6c87a1e265dc2823440923c271b15a3687ef03bbc6e0e924344cf01617bd0aa4d57da22e7b890dd1f11bf1683f6bd42b7f43e66869bf76218d54f4fe5"' :
                                            'id="xs-components-links-module-PropertiesModule-498fcbb6c87a1e265dc2823440923c271b15a3687ef03bbc6e0e924344cf01617bd0aa4d57da22e7b890dd1f11bf1683f6bd42b7f43e66869bf76218d54f4fe5"' }>
                                            <li class="link">
                                                <a href="components/PropertiesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PropertiesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/QuickAccessModule.html" data-type="entity-link" >QuickAccessModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-QuickAccessModule-db14763a3aff0f6b98d477a79ce912493c030ba4abe7e0633f050b6de18a8c081ceed39627b7dae87557cf4c3cb5e26677028a9c217dba0e2e6b5528c70c5c97"' : 'data-bs-target="#xs-components-links-module-QuickAccessModule-db14763a3aff0f6b98d477a79ce912493c030ba4abe7e0633f050b6de18a8c081ceed39627b7dae87557cf4c3cb5e26677028a9c217dba0e2e6b5528c70c5c97"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-QuickAccessModule-db14763a3aff0f6b98d477a79ce912493c030ba4abe7e0633f050b6de18a8c081ceed39627b7dae87557cf4c3cb5e26677028a9c217dba0e2e6b5528c70c5c97"' :
                                            'id="xs-components-links-module-QuickAccessModule-db14763a3aff0f6b98d477a79ce912493c030ba4abe7e0633f050b6de18a8c081ceed39627b7dae87557cf4c3cb5e26677028a9c217dba0e2e6b5528c70c5c97"' }>
                                            <li class="link">
                                                <a href="components/QuickAccessComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QuickAccessComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RegisterModule.html" data-type="entity-link" >RegisterModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RegisterModule-de05e3b8d5a4b9794d5d841cd4cfbb08daf4954ad1f2a7d67ad91935ebab0ae71e4393d6fd493e807ccdae5b3518982e3c480267e6b0736734e8855fdd915151"' : 'data-bs-target="#xs-components-links-module-RegisterModule-de05e3b8d5a4b9794d5d841cd4cfbb08daf4954ad1f2a7d67ad91935ebab0ae71e4393d6fd493e807ccdae5b3518982e3c480267e6b0736734e8855fdd915151"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegisterModule-de05e3b8d5a4b9794d5d841cd4cfbb08daf4954ad1f2a7d67ad91935ebab0ae71e4393d6fd493e807ccdae5b3518982e3c480267e6b0736734e8855fdd915151"' :
                                            'id="xs-components-links-module-RegisterModule-de05e3b8d5a4b9794d5d841cd4cfbb08daf4954ad1f2a7d67ad91935ebab0ae71e4393d6fd493e807ccdae5b3518982e3c480267e6b0736734e8855fdd915151"' }>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RowCardModule.html" data-type="entity-link" >RowCardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RowCardModule-ad67751aa6a4134077950694ec6fefe2fd97ca3c0ba370e14bce288583c9feb1efddacc21464686a5276a1d44b97de4a06845b41dc34a234115a59aabc579895"' : 'data-bs-target="#xs-components-links-module-RowCardModule-ad67751aa6a4134077950694ec6fefe2fd97ca3c0ba370e14bce288583c9feb1efddacc21464686a5276a1d44b97de4a06845b41dc34a234115a59aabc579895"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RowCardModule-ad67751aa6a4134077950694ec6fefe2fd97ca3c0ba370e14bce288583c9feb1efddacc21464686a5276a1d44b97de4a06845b41dc34a234115a59aabc579895"' :
                                            'id="xs-components-links-module-RowCardModule-ad67751aa6a4134077950694ec6fefe2fd97ca3c0ba370e14bce288583c9feb1efddacc21464686a5276a1d44b97de4a06845b41dc34a234115a59aabc579895"' }>
                                            <li class="link">
                                                <a href="components/RowCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RowCardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SearchAllModule.html" data-type="entity-link" >SearchAllModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SearchAllModule-a155d0325857adb7bfb5807f327469269d1b4e4e7a8af7a8301fa7e0b5e2d4ad5a49a1d477eec977c24963491407c4fa0084c663d21d0107d48b6a6f4cd8feba"' : 'data-bs-target="#xs-components-links-module-SearchAllModule-a155d0325857adb7bfb5807f327469269d1b4e4e7a8af7a8301fa7e0b5e2d4ad5a49a1d477eec977c24963491407c4fa0084c663d21d0107d48b6a6f4cd8feba"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SearchAllModule-a155d0325857adb7bfb5807f327469269d1b4e4e7a8af7a8301fa7e0b5e2d4ad5a49a1d477eec977c24963491407c4fa0084c663d21d0107d48b6a6f4cd8feba"' :
                                            'id="xs-components-links-module-SearchAllModule-a155d0325857adb7bfb5807f327469269d1b4e4e7a8af7a8301fa7e0b5e2d4ad5a49a1d477eec977c24963491407c4fa0084c663d21d0107d48b6a6f4cd8feba"' }>
                                            <li class="link">
                                                <a href="components/SearchAllComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchAllComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SecurityModule.html" data-type="entity-link" >SecurityModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SecurityModule-7cc5e5e143f78dcc7bd478cc7f2e4f57029a41bf70589ec43c2371086549195be03ceab4808bc8c878f39fb681800d91a0058d40aa89671cb5ae08016af92527"' : 'data-bs-target="#xs-components-links-module-SecurityModule-7cc5e5e143f78dcc7bd478cc7f2e4f57029a41bf70589ec43c2371086549195be03ceab4808bc8c878f39fb681800d91a0058d40aa89671cb5ae08016af92527"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SecurityModule-7cc5e5e143f78dcc7bd478cc7f2e4f57029a41bf70589ec43c2371086549195be03ceab4808bc8c878f39fb681800d91a0058d40aa89671cb5ae08016af92527"' :
                                            'id="xs-components-links-module-SecurityModule-7cc5e5e143f78dcc7bd478cc7f2e4f57029a41bf70589ec43c2371086549195be03ceab4808bc8c878f39fb681800d91a0058d40aa89671cb5ae08016af92527"' }>
                                            <li class="link">
                                                <a href="components/SecurityComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SecurityComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SidebarModule.html" data-type="entity-link" >SidebarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SidebarModule-91ca1dd0b380fa7fa2720a57ffe1fe6e4ebc86f548b982d5b95b63cc2ee94a80f4ed01e48cb10f58b6854ec2d293893aa2519934ea321b3b66017290190cc818"' : 'data-bs-target="#xs-components-links-module-SidebarModule-91ca1dd0b380fa7fa2720a57ffe1fe6e4ebc86f548b982d5b95b63cc2ee94a80f4ed01e48cb10f58b6854ec2d293893aa2519934ea321b3b66017290190cc818"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SidebarModule-91ca1dd0b380fa7fa2720a57ffe1fe6e4ebc86f548b982d5b95b63cc2ee94a80f4ed01e48cb10f58b6854ec2d293893aa2519934ea321b3b66017290190cc818"' :
                                            'id="xs-components-links-module-SidebarModule-91ca1dd0b380fa7fa2720a57ffe1fe6e4ebc86f548b982d5b95b63cc2ee94a80f4ed01e48cb10f58b6854ec2d293893aa2519934ea321b3b66017290190cc818"' }>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidebarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StatusModule.html" data-type="entity-link" >StatusModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-StatusModule-df9548d19c71df6737fa6150254cc9ebfabb0a027a6f4f6209f064931cad5c53cafa138c8e23fdfa9958cbc92dda31d5895a22cc93a2ea9d025678c185df6133"' : 'data-bs-target="#xs-components-links-module-StatusModule-df9548d19c71df6737fa6150254cc9ebfabb0a027a6f4f6209f064931cad5c53cafa138c8e23fdfa9958cbc92dda31d5895a22cc93a2ea9d025678c185df6133"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StatusModule-df9548d19c71df6737fa6150254cc9ebfabb0a027a6f4f6209f064931cad5c53cafa138c8e23fdfa9958cbc92dda31d5895a22cc93a2ea9d025678c185df6133"' :
                                            'id="xs-components-links-module-StatusModule-df9548d19c71df6737fa6150254cc9ebfabb0a027a6f4f6209f064931cad5c53cafa138c8e23fdfa9958cbc92dda31d5895a22cc93a2ea9d025678c185df6133"' }>
                                            <li class="link">
                                                <a href="components/StatusComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatusComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TaskModule.html" data-type="entity-link" >TaskModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TaskModule-4be7279b5515441d608a3cf2362c6fea2ce86c01dd783eed8ebe35d55bf93ae811f1976d6ef9dd9434d245226e67aec6ebee970fa7c07e2db69c98a846980716"' : 'data-bs-target="#xs-components-links-module-TaskModule-4be7279b5515441d608a3cf2362c6fea2ce86c01dd783eed8ebe35d55bf93ae811f1976d6ef9dd9434d245226e67aec6ebee970fa7c07e2db69c98a846980716"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TaskModule-4be7279b5515441d608a3cf2362c6fea2ce86c01dd783eed8ebe35d55bf93ae811f1976d6ef9dd9434d245226e67aec6ebee970fa7c07e2db69c98a846980716"' :
                                            'id="xs-components-links-module-TaskModule-4be7279b5515441d608a3cf2362c6fea2ce86c01dd783eed8ebe35d55bf93ae811f1976d6ef9dd9434d245226e67aec6ebee970fa7c07e2db69c98a846980716"' }>
                                            <li class="link">
                                                <a href="components/AttachmentItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AttachmentItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AttachmentsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AttachmentsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CommentsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TasksModule.html" data-type="entity-link" >TasksModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TasksModule-4230be207a09c241b1dd9fc2680734f00a6c32041ae54c7833387b5b2302fd0077e50191be7dc6438783b2d22d39bc09e8327de1f0bd841b0d9ed6b9c98a2a8f"' : 'data-bs-target="#xs-components-links-module-TasksModule-4230be207a09c241b1dd9fc2680734f00a6c32041ae54c7833387b5b2302fd0077e50191be7dc6438783b2d22d39bc09e8327de1f0bd841b0d9ed6b9c98a2a8f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TasksModule-4230be207a09c241b1dd9fc2680734f00a6c32041ae54c7833387b5b2302fd0077e50191be7dc6438783b2d22d39bc09e8327de1f0bd841b0d9ed6b9c98a2a8f"' :
                                            'id="xs-components-links-module-TasksModule-4230be207a09c241b1dd9fc2680734f00a6c32041ae54c7833387b5b2302fd0077e50191be7dc6438783b2d22d39bc09e8327de1f0bd841b0d9ed6b9c98a2a8f"' }>
                                            <li class="link">
                                                <a href="components/MuralComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MuralComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TasksComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TasksComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TeamInformationsModule.html" data-type="entity-link" >TeamInformationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TeamInformationsModule-5bd0f21146da922b1db7068117da8203f9a005ad631790dafa5605e0fb10d5dd61dc313816ce8def7ee6a9d3045f139804ed967ed8fe1c23d478c9181ba58b4a"' : 'data-bs-target="#xs-components-links-module-TeamInformationsModule-5bd0f21146da922b1db7068117da8203f9a005ad631790dafa5605e0fb10d5dd61dc313816ce8def7ee6a9d3045f139804ed967ed8fe1c23d478c9181ba58b4a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TeamInformationsModule-5bd0f21146da922b1db7068117da8203f9a005ad631790dafa5605e0fb10d5dd61dc313816ce8def7ee6a9d3045f139804ed967ed8fe1c23d478c9181ba58b4a"' :
                                            'id="xs-components-links-module-TeamInformationsModule-5bd0f21146da922b1db7068117da8203f9a005ad631790dafa5605e0fb10d5dd61dc313816ce8def7ee6a9d3045f139804ed967ed8fe1c23d478c9181ba58b4a"' }>
                                            <li class="link">
                                                <a href="components/TeamInformationsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeamInformationsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TeamsSettingsModule.html" data-type="entity-link" >TeamsSettingsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TeamsSettingsModule-c9cdebe3c6958b9f23f908513b8a7ac9ab5c9ca79385b632376effca5c29eb816dea1cb800cf1f43399825bf6cf0783f3846332150e40f4e7254cb805a49b3f2"' : 'data-bs-target="#xs-components-links-module-TeamsSettingsModule-c9cdebe3c6958b9f23f908513b8a7ac9ab5c9ca79385b632376effca5c29eb816dea1cb800cf1f43399825bf6cf0783f3846332150e40f4e7254cb805a49b3f2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TeamsSettingsModule-c9cdebe3c6958b9f23f908513b8a7ac9ab5c9ca79385b632376effca5c29eb816dea1cb800cf1f43399825bf6cf0783f3846332150e40f4e7254cb805a49b3f2"' :
                                            'id="xs-components-links-module-TeamsSettingsModule-c9cdebe3c6958b9f23f908513b8a7ac9ab5c9ca79385b632376effca5c29eb816dea1cb800cf1f43399825bf6cf0783f3846332150e40f4e7254cb805a49b3f2"' }>
                                            <li class="link">
                                                <a href="components/TeamsSettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeamsSettingsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserInformationsModule.html" data-type="entity-link" >UserInformationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-UserInformationsModule-644c79e71d2401c971b7e91a4d1295840dced12861e14a0166973871a383cb6c31900b2fcd17bdad8d2c26461306e79ab06dfe12a3d5867597d00a3792589af7"' : 'data-bs-target="#xs-components-links-module-UserInformationsModule-644c79e71d2401c971b7e91a4d1295840dced12861e14a0166973871a383cb6c31900b2fcd17bdad8d2c26461306e79ab06dfe12a3d5867597d00a3792589af7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserInformationsModule-644c79e71d2401c971b7e91a4d1295840dced12861e14a0166973871a383cb6c31900b2fcd17bdad8d2c26461306e79ab06dfe12a3d5867597d00a3792589af7"' :
                                            'id="xs-components-links-module-UserInformationsModule-644c79e71d2401c971b7e91a4d1295840dced12861e14a0166973871a383cb6c31900b2fcd17bdad8d2c26461306e79ab06dfe12a3d5867597d00a3792589af7"' }>
                                            <li class="link">
                                                <a href="components/UserInformationsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserInformationsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserSettingsModule.html" data-type="entity-link" >UserSettingsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-UserSettingsModule-4d68544a89bf22cb9c2a2d639cb97e69142ea3beffe4d78ba9981567812cc85d8a53dd41735932db84a28041e76274f462d73765e58311ef1f6bf35a37fffb07"' : 'data-bs-target="#xs-components-links-module-UserSettingsModule-4d68544a89bf22cb9c2a2d639cb97e69142ea3beffe4d78ba9981567812cc85d8a53dd41735932db84a28041e76274f462d73765e58311ef1f6bf35a37fffb07"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserSettingsModule-4d68544a89bf22cb9c2a2d639cb97e69142ea3beffe4d78ba9981567812cc85d8a53dd41735932db84a28041e76274f462d73765e58311ef1f6bf35a37fffb07"' :
                                            'id="xs-components-links-module-UserSettingsModule-4d68544a89bf22cb9c2a2d639cb97e69142ea3beffe4d78ba9981567812cc85d8a53dd41735932db84a28041e76274f462d73765e58311ef1f6bf35a37fffb07"' }>
                                            <li class="link">
                                                <a href="components/AppearanceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppearanceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotificationsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserSettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserSettingsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/ReviewTaskComponent.html" data-type="entity-link" >ReviewTaskComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Chat.html" data-type="entity-link" >Chat</a>
                            </li>
                            <li class="link">
                                <a href="classes/Comment.html" data-type="entity-link" >Comment</a>
                            </li>
                            <li class="link">
                                <a href="classes/CommentSend.html" data-type="entity-link" >CommentSend</a>
                            </li>
                            <li class="link">
                                <a href="classes/Group.html" data-type="entity-link" >Group</a>
                            </li>
                            <li class="link">
                                <a href="classes/HasPermission.html" data-type="entity-link" >HasPermission</a>
                            </li>
                            <li class="link">
                                <a href="classes/Message.html" data-type="entity-link" >Message</a>
                            </li>
                            <li class="link">
                                <a href="classes/Note.html" data-type="entity-link" >Note</a>
                            </li>
                            <li class="link">
                                <a href="classes/Notification.html" data-type="entity-link" >Notification</a>
                            </li>
                            <li class="link">
                                <a href="classes/Permission.html" data-type="entity-link" >Permission</a>
                            </li>
                            <li class="link">
                                <a href="classes/Personalization.html" data-type="entity-link" >Personalization</a>
                            </li>
                            <li class="link">
                                <a href="classes/Project.html" data-type="entity-link" >Project</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProjectCollaborators.html" data-type="entity-link" >ProjectCollaborators</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProjectEdit.html" data-type="entity-link" >ProjectEdit</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProjectResponsible.html" data-type="entity-link" >ProjectResponsible</a>
                            </li>
                            <li class="link">
                                <a href="classes/Property.html" data-type="entity-link" >Property</a>
                            </li>
                            <li class="link">
                                <a href="classes/PropertyCreation.html" data-type="entity-link" >PropertyCreation</a>
                            </li>
                            <li class="link">
                                <a href="classes/PropertyList.html" data-type="entity-link" >PropertyList</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReturnTaskResponsables.html" data-type="entity-link" >ReturnTaskResponsables</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReviewCheck.html" data-type="entity-link" >ReviewCheck</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchItem.html" data-type="entity-link" >SearchItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/SentToReview.html" data-type="entity-link" >SentToReview</a>
                            </li>
                            <li class="link">
                                <a href="classes/Task.html" data-type="entity-link" >Task</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskCreate.html" data-type="entity-link" >TaskCreate</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskEdit.html" data-type="entity-link" >TaskEdit</a>
                            </li>
                            <li class="link">
                                <a href="classes/taskHour.html" data-type="entity-link" >taskHour</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskResponsable.html" data-type="entity-link" >TaskResponsable</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskWaitingToReview.html" data-type="entity-link" >TaskWaitingToReview</a>
                            </li>
                            <li class="link">
                                <a href="classes/Team.html" data-type="entity-link" >Team</a>
                            </li>
                            <li class="link">
                                <a href="classes/TimeInTask.html" data-type="entity-link" >TimeInTask</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateResponsibles.html" data-type="entity-link" >UpdateResponsibles</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/Value.html" data-type="entity-link" >Value</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValueCreatedWhenTaskCreated.html" data-type="entity-link" >ValueCreatedWhenTaskCreated</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValueUpdate.html" data-type="entity-link" >ValueUpdate</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AlertService.html" data-type="entity-link" >AlertService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DisplayService.html" data-type="entity-link" >DisplayService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ForgotPasswordService.html" data-type="entity-link" >ForgotPasswordService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GroupService.html" data-type="entity-link" >GroupService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoadingService.html" data-type="entity-link" >LoadingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NoteService.html" data-type="entity-link" >NoteService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationWebSocketService.html" data-type="entity-link" >NotificationWebSocketService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PersonalizationService.html" data-type="entity-link" >PersonalizationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProjectService.html" data-type="entity-link" >ProjectService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PropertyService.html" data-type="entity-link" >PropertyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReviewService.html" data-type="entity-link" >ReviewService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SearchService.html" data-type="entity-link" >SearchService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/taskHourService.html" data-type="entity-link" >taskHourService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskService.html" data-type="entity-link" >TaskService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TeamService.html" data-type="entity-link" >TeamService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TextSpeechService.html" data-type="entity-link" >TextSpeechService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserStateService.html" data-type="entity-link" >UserStateService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WebSocketService.html" data-type="entity-link" >WebSocketService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interceptors-links"' :
                            'data-bs-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/LoadingInterceptor.html" data-type="entity-link" >LoadingInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/UserTeamGuard.html" data-type="entity-link" >UserTeamGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Color.html" data-type="entity-link" >Color</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Color-1.html" data-type="entity-link" >Color</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/File.html" data-type="entity-link" >File</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterParams.html" data-type="entity-link" >FilterParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LocationItem.html" data-type="entity-link" >LocationItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LogRecord.html" data-type="entity-link" >LogRecord</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PipeParams.html" data-type="entity-link" >PipeParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Position.html" data-type="entity-link" >Position</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UploadEvent.html" data-type="entity-link" >UploadEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserTeam.html" data-type="entity-link" >UserTeam</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});