import type { LanguageCode } from './languages'

/**
 * The whole site's static text, in English. This object's keys are the
 * source of truth: every other language below is typed against them, so
 * TypeScript refuses to compile if a translation is missing a key.
 *
 * Dynamic content — the alt text and captions published from /admin — is
 * translated separately, on the server, using Cloudflare Workers AI. See
 * shared/handlers.ts.
 */
const en = {
  'app.tagline': 'Amateur Storm Forecast Center',

  'disclaimer.short':
    "This is for experimental purposes only and this doesn't replace official weather warnings or forecasts.",

  'nav.sources': 'SOURCES',
  'nav.outlook': 'STORM OUTLOOK',
  'nav.alerts': 'ALERTS',

  'home.sourcesDesc': 'Radar, satellite and model images collected from the sources ASFC follows.',
  'home.outlookDesc': 'Experimental amateur storm outlook maps published by ASFC.',
  'home.alertsDesc':
    'Images related to severe weather situations. Official warnings are issued by the national meteorological services, not by ASFC.',
  'home.settings': 'SETTINGS',
  'home.updateLog': 'UPDATE LOG',
  'home.tutorial': 'TUTORIAL',
  'home.metaDesc': 'ASFC — Amateur Storm Forecast Center.',

  'header.backToHome': '← Back to home',
  'header.menu': 'Menu',
  'header.close': 'Close',

  'footer.officialInfo':
    'Official warnings and forecasts are issued by the national meteorological services. Images and data belong to their respective owners.',

  'disclaimerDialog.text':
    "Disclaimer: This website is for experimental purposes only! warnings, alerts and storm outlooks are not official and they don't replace official warnings, so if a warning is issued, double-check it on official warning platforms!",
  'disclaimerDialog.gotIt': 'Got it!',
  'disclaimerDialog.dontShowAgain': "Don't show this again",

  'sources.title': 'Sources',
  'sources.metaDesc': 'The data providers ASFC follows: ECMWF, ALADIN and Deutscher Wetterdienst.',
  'sources.logoAlt': '{name} logo',

  'outlook.chooserTitle': 'Storm Outlook',
  'outlook.chooserMetaDesc':
    'Experimental amateur storm outlooks published by ASFC for Austria, Czechia, Slovakia and Hungary.',
  'outlook.forecastFor': 'FORECAST FOR {country}',
  'outlook.pageMetaDesc': 'The current experimental ASFC storm outlook for {country}.',
  'outlook.emptyHint': 'No outlook published for {country} yet.',

  'archive.chooserTitle': 'Outlook Archive',
  'archive.chooserMetaDesc':
    'Previously published ASFC storm outlooks for Austria, Czechia, Slovakia and Hungary.',
  'archive.countryArchive': '{country} OUTLOOK ARCHIVE',
  'archive.pageMetaDesc': 'Previously published ASFC storm outlooks for {country}.',
  'archive.emptyHint': 'No older outlooks for {country} yet.',

  'alerts.title': 'Alerts',
  'alerts.metaDesc': 'Severe weather images published by ASFC.',
  'alerts.emptyHint': 'No alerts published yet.',

  'common.loading': 'Loading…',

  'settings.title': 'Settings',
  'settings.metaDesc': 'Choose what ASFC shows you when you open the site.',
  'settings.alertSettings': 'Alert settings',
  'settings.showAlertPopups': 'Show alert windows at opening website',
  'settings.on': 'on',
  'settings.off': 'off',
  'settings.alertsOnDesc': 'Alerts appear in a window when you open the site.',
  'settings.alertsOffDesc': 'Alert windows stay hidden until you switch this back on.',
  'settings.showHiddenAlerts': 'Show hidden alerts again ({count})',
  'settings.showHiddenAlertsDesc':
    'Brings back the alerts you hid with “Don’t show this alert again”.',
  'settings.selectCountry': 'Select your country',
  'settings.language': 'Language',
  'settings.countryOpensStraightAway': 'Storm Outlook opens {country} straight away.',
  'settings.clear': 'Clear',
  'settings.resetSettings': 'Reset settings',

  'countryDialog.explain':
    'select your country so you will only get a storm outlook automatically for your selected country.',
  'countryDialog.ok': 'OK',
  'countryDialog.noThanks': 'No thanks',
  'countryDialog.backToHome': 'Back to home',

  'resetDialog.confirm': 'are you sure you want to reset settings',
  'resetDialog.no': 'No',
  'resetDialog.yes': 'Yes',

  'welcome.dialogLabel': 'Welcome to ASFC',
  'welcome.ask': 'welcome to Asfc, would you like to have a quick tutorial?',
  'welcome.yes': 'Yes',
  'welcome.no': 'No',

  'tutorial.dialogLabel': 'ASFC tutorial',
  'tutorial.imageAlt': 'Storm outlook map with the colour key in the upper-left corner circled',
  'tutorial.text':
    "on storm outlook, if a color is given to your location or about 40 kilometers from your location, right in the upper left corner there is the key to what the color means. if there's a severe or a strong thunderstorm around the area of Czechia, Slovakia, Austria or Hungary, we are most likely to give a warning for it in Alerts. DISCLAIMER: our warnings are not official and they don't replace national weather services or official weather warnings. you can change other stuff in settings.",
  'tutorial.ok': 'OK',

  'alertPopup.dialogLabel': 'Weather alert',
  'alertPopup.ok': 'OK',
  'alertPopup.dontShowThisAlert': "Don't show this alert again",
  'alertPopup.changeInSettings': 'you can change this in settings.',

  'updateLog.title': 'Update log',
  'updateLog.metaDesc': 'What changed in each version of the ASFC website.',
  'updateLog.moreUpdatesSoon': 'more updates soon!',

  'notFound.title': 'Page not found',
  'notFound.metaDesc': 'This ASFC page does not exist.',
  'notFound.backToHomepage': 'Back to homepage',

  'language.default': 'Default',
  'country.austria': 'Austria',
  'country.czechia': 'Czechia',
  'country.slovakia': 'Slovakia',
  'country.hungary': 'Hungary',
  'home.archive': 'ARCHIVE',
  'archive.rootTitle': 'Archive',
  'archive.rootMetaDesc': "Browse ASFC's alert and storm outlook archives.",
  'archive.alertsArchive': 'Alerts Archive',
  'archive.alertsArchiveMetaDesc': 'Previously published ASFC alert images.',
  'archive.alertsArchiveEmptyHint': 'No archived alerts yet.',
  'language.german': 'German',
} satisfies Record<string, string>

export type TranslationKey = keyof typeof en

const de: Record<TranslationKey, string> = {
  'app.tagline': 'Amateur-Sturmvorhersagezentrum',

  'disclaimer.short':
    'Dies dient nur zu experimentellen Zwecken und ersetzt keine offiziellen Wetterwarnungen oder -vorhersagen.',

  'nav.sources': 'QUELLEN',
  'nav.outlook': 'STURMAUSBLICK',
  'nav.alerts': 'WARNUNGEN',

  'home.sourcesDesc': 'Radar-, Satelliten- und Modellbilder aus den von ASFC verfolgten Quellen.',
  'home.outlookDesc': 'Experimentelle Amateur-Sturmausblickskarten, veröffentlicht von ASFC.',
  'home.alertsDesc':
    'Bilder zu schweren Wettersituationen. Offizielle Warnungen werden von den nationalen Wetterdiensten herausgegeben, nicht von ASFC.',
  'home.settings': 'EINSTELLUNGEN',
  'home.updateLog': 'AKTUALISIERUNGEN',
  'home.tutorial': 'ANLEITUNG',
  'home.metaDesc': 'ASFC — Amateur-Sturmvorhersagezentrum.',

  'header.backToHome': '← Zurück zur Startseite',
  'header.menu': 'Menü',
  'header.close': 'Schließen',

  'footer.officialInfo':
    'Offizielle Warnungen und Vorhersagen werden von den nationalen Wetterdiensten herausgegeben. Bilder und Daten gehören ihren jeweiligen Eigentümern.',

  'disclaimerDialog.text':
    'Haftungsausschluss: Diese Website dient ausschließlich experimentellen Zwecken! Warnungen, Alarme und Sturmausblicke sind nicht offiziell und ersetzen keine offiziellen Warnungen. Wenn eine Warnung herausgegeben wird, überprüfen Sie diese bitte auf offiziellen Warnplattformen!',
  'disclaimerDialog.gotIt': 'Verstanden!',
  'disclaimerDialog.dontShowAgain': 'Nicht mehr anzeigen',

  'sources.title': 'Quellen',
  'sources.metaDesc': 'Die von ASFC genutzten Datenquellen: ECMWF, ALADIN und der Deutsche Wetterdienst.',
  'sources.logoAlt': 'Logo von {name}',

  'outlook.chooserTitle': 'Sturmausblick',
  'outlook.chooserMetaDesc':
    'Experimentelle Amateur-Sturmausblicke von ASFC für Österreich, Tschechien, die Slowakei und Ungarn.',
  'outlook.forecastFor': 'PROGNOSE FÜR {country}',
  'outlook.pageMetaDesc': 'Der aktuelle experimentelle ASFC-Sturmausblick für {country}.',
  'outlook.emptyHint': 'Für {country} wurde noch kein Ausblick veröffentlicht.',

  'archive.chooserTitle': 'Ausblick-Archiv',
  'archive.chooserMetaDesc':
    'Zuvor veröffentlichte ASFC-Sturmausblicke für Österreich, Tschechien, die Slowakei und Ungarn.',
  'archive.countryArchive': 'AUSBLICK-ARCHIV {country}',
  'archive.pageMetaDesc': 'Zuvor veröffentlichte ASFC-Sturmausblicke für {country}.',
  'archive.emptyHint': 'Für {country} gibt es noch keine älteren Ausblicke.',

  'alerts.title': 'Warnungen',
  'alerts.metaDesc': 'Von ASFC veröffentlichte Bilder zu schwerem Unwetter.',
  'alerts.emptyHint': 'Es wurden noch keine Warnungen veröffentlicht.',

  'common.loading': 'Wird geladen…',

  'settings.title': 'Einstellungen',
  'settings.metaDesc': 'Wählen Sie, was ASFC Ihnen beim Öffnen der Website anzeigt.',
  'settings.alertSettings': 'Warnungseinstellungen',
  'settings.showAlertPopups': 'Warnfenster beim Öffnen der Website anzeigen',
  'settings.on': 'an',
  'settings.off': 'aus',
  'settings.alertsOnDesc': 'Warnungen erscheinen in einem Fenster, wenn Sie die Website öffnen.',
  'settings.alertsOffDesc': 'Warnfenster bleiben ausgeblendet, bis Sie dies wieder einschalten.',
  'settings.showHiddenAlerts': 'Ausgeblendete Warnungen wieder anzeigen ({count})',
  'settings.showHiddenAlertsDesc':
    'Bringt die Warnungen zurück, die Sie mit „Nicht mehr anzeigen“ ausgeblendet haben.',
  'settings.selectCountry': 'Land auswählen',
  'settings.language': 'Sprache',
  'settings.countryOpensStraightAway': 'Der Sturmausblick öffnet direkt {country}.',
  'settings.clear': 'Zurücksetzen',
  'settings.resetSettings': 'Einstellungen zurücksetzen',

  'countryDialog.explain':
    'Wählen Sie Ihr Land aus, damit Sie automatisch nur den Sturmausblick für Ihr ausgewähltes Land erhalten.',
  'countryDialog.ok': 'OK',
  'countryDialog.noThanks': 'Nein, danke',
  'countryDialog.backToHome': 'Zurück zur Startseite',

  'resetDialog.confirm': 'Sind Sie sicher, dass Sie die Einstellungen zurücksetzen möchten?',
  'resetDialog.no': 'Nein',
  'resetDialog.yes': 'Ja',

  'welcome.dialogLabel': 'Willkommen bei ASFC',
  'welcome.ask': 'Willkommen bei ASFC, möchten Sie eine kurze Einführung?',
  'welcome.yes': 'Ja',
  'welcome.no': 'Nein',

  'tutorial.dialogLabel': 'ASFC-Anleitung',
  'tutorial.imageAlt':
    'Sturmausblickskarte mit der in der oberen linken Ecke eingekreisten Farblegende',
  'tutorial.text':
    'Wenn Ihrem Standort oder einem Gebiet etwa 40 Kilometer davon entfernt im Sturmausblick eine Farbe zugewiesen ist, finden Sie oben links die Legende dazu, was diese Farbe bedeutet. Wenn im Gebiet von Tschechien, der Slowakei, Österreich oder Ungarn ein schweres oder starkes Gewitter zu erwarten ist, veröffentlichen wir dazu höchstwahrscheinlich eine Warnung unter Warnungen. HAFTUNGSAUSSCHLUSS: Unsere Warnungen sind nicht offiziell und ersetzen keine nationalen Wetterdienste oder offiziellen Wetterwarnungen. Weitere Einstellungen können Sie unter Einstellungen ändern.',
  'tutorial.ok': 'OK',

  'alertPopup.dialogLabel': 'Wetterwarnung',
  'alertPopup.ok': 'OK',
  'alertPopup.dontShowThisAlert': 'Diese Warnung nicht mehr anzeigen',
  'alertPopup.changeInSettings': 'Sie können dies in den Einstellungen ändern.',

  'updateLog.title': 'Aktualisierungsverlauf',
  'updateLog.metaDesc': 'Was sich in jeder Version der ASFC-Website geändert hat.',
  'updateLog.moreUpdatesSoon': 'weitere Updates folgen bald!',

  'notFound.title': 'Seite nicht gefunden',
  'notFound.metaDesc': 'Diese ASFC-Seite existiert nicht.',
  'notFound.backToHomepage': 'Zurück zur Startseite',

  'language.default': 'Standard',
  'country.austria': 'Österreich',
  'country.czechia': 'Tschechien',
  'country.slovakia': 'Slowakei',
  'country.hungary': 'Ungarn',
  'home.archive': 'ARCHIV',
  'archive.rootTitle': 'Archiv',
  'archive.rootMetaDesc': 'Durchsuchen Sie die Warnungs- und Sturmausblick-Archive von ASFC.',
  'archive.alertsArchive': 'Warnungsarchiv',
  'archive.alertsArchiveMetaDesc': 'Zuvor veröffentlichte ASFC-Warnbilder.',
  'archive.alertsArchiveEmptyHint': 'Es gibt noch keine archivierten Warnungen.',
  'language.german': 'Deutsch',
}

const cs: Record<TranslationKey, string> = {
  'app.tagline': 'Amatérské centrum pro předpověď bouří',

  'disclaimer.short':
    'Toto slouží pouze k experimentálním účelům a nenahrazuje oficiální varování ani předpovědi počasí.',

  'nav.sources': 'ZDROJE',
  'nav.outlook': 'VÝHLED BOUŘEK',
  'nav.alerts': 'VAROVÁNÍ',

  'home.sourcesDesc': 'Radarové, satelitní a modelové snímky ze zdrojů, které ASFC sleduje.',
  'home.outlookDesc': 'Experimentální amatérské mapy výhledu bouřek zveřejněné ASFC.',
  'home.alertsDesc':
    'Obrázky týkající se nebezpečných povětrnostních situací. Oficiální varování vydávají národní meteorologické služby, nikoli ASFC.',
  'home.settings': 'NASTAVENÍ',
  'home.updateLog': 'SEZNAM AKTUALIZACÍ',
  'home.tutorial': 'NÁVOD',
  'home.metaDesc': 'ASFC — Amatérské centrum pro předpověď bouří.',

  'header.backToHome': '← Zpět na hlavní stránku',
  'header.menu': 'Menu',
  'header.close': 'Zavřít',

  'footer.officialInfo':
    'Oficiální varování a předpovědi vydávají národní meteorologické služby. Obrázky a data patří jejich příslušným vlastníkům.',

  'disclaimerDialog.text':
    'Upozornění: Tento web slouží pouze k experimentálním účelům! Varování, upozornění a výhledy bouřek nejsou oficiální a nenahrazují oficiální varování. Pokud je vydáno varování, ověřte si ho na oficiálních platformách pro varování!',
  'disclaimerDialog.gotIt': 'Rozumím!',
  'disclaimerDialog.dontShowAgain': 'Příště nezobrazovat',

  'sources.title': 'Zdroje',
  'sources.metaDesc': 'Zdroje dat, které ASFC sleduje: ECMWF, ALADIN a Deutscher Wetterdienst.',
  'sources.logoAlt': 'logo {name}',

  'outlook.chooserTitle': 'Výhled bouřek',
  'outlook.chooserMetaDesc':
    'Experimentální amatérské výhledy bouřek zveřejněné ASFC pro Rakousko, Česko, Slovensko a Maďarsko.',
  'outlook.forecastFor': 'VÝHLED PRO {country}',
  'outlook.pageMetaDesc': 'Aktuální experimentální výhled bouřek ASFC pro {country}.',
  'outlook.emptyHint': 'Pro {country} zatím nebyl zveřejněn žádný výhled.',

  'archive.chooserTitle': 'Archiv výhledů',
  'archive.chooserMetaDesc':
    'Dříve zveřejněné výhledy bouřek ASFC pro Rakousko, Česko, Slovensko a Maďarsko.',
  'archive.countryArchive': 'ARCHIV VÝHLEDŮ {country}',
  'archive.pageMetaDesc': 'Dříve zveřejněné výhledy bouřek ASFC pro {country}.',
  'archive.emptyHint': 'Pro {country} zatím nejsou žádné starší výhledy.',

  'alerts.title': 'Varování',
  'alerts.metaDesc': 'Obrázky nebezpečného počasí zveřejněné ASFC.',
  'alerts.emptyHint': 'Zatím nebyla zveřejněna žádná varování.',

  'common.loading': 'Načítání…',

  'settings.title': 'Nastavení',
  'settings.metaDesc': 'Vyberte, co vám ASFC zobrazí při otevření webu.',
  'settings.alertSettings': 'Nastavení varování',
  'settings.showAlertPopups': 'Zobrazit okna s varováním při otevření webu',
  'settings.on': 'zapnuto',
  'settings.off': 'vypnuto',
  'settings.alertsOnDesc': 'Varování se zobrazí v okně při otevření webu.',
  'settings.alertsOffDesc': 'Okna s varováním zůstanou skrytá, dokud je znovu nezapnete.',
  'settings.showHiddenAlerts': 'Znovu zobrazit skrytá varování ({count})',
  'settings.showHiddenAlertsDesc':
    'Vrátí zpět varování, která jste skryli pomocí „Příště toto varování nezobrazovat“.',
  'settings.selectCountry': 'Vyberte svou zemi',
  'settings.language': 'Jazyk',
  'settings.countryOpensStraightAway': 'Výhled bouřek se otevře rovnou pro {country}.',
  'settings.clear': 'Zrušit',
  'settings.resetSettings': 'Obnovit výchozí nastavení',

  'countryDialog.explain':
    'Vyberte svou zemi, abyste automaticky dostávali výhled bouřek pouze pro vaši vybranou zemi.',
  'countryDialog.ok': 'OK',
  'countryDialog.noThanks': 'Ne, děkuji',
  'countryDialog.backToHome': 'Zpět na hlavní stránku',

  'resetDialog.confirm': 'Opravdu chcete obnovit výchozí nastavení?',
  'resetDialog.no': 'Ne',
  'resetDialog.yes': 'Ano',

  'welcome.dialogLabel': 'Vítejte na ASFC',
  'welcome.ask': 'Vítejte na ASFC, chcete si projít rychlý návod?',
  'welcome.yes': 'Ano',
  'welcome.no': 'Ne',

  'tutorial.dialogLabel': 'Návod ASFC',
  'tutorial.imageAlt': 'Mapa výhledu bouřek s barevnou legendou zakroužkovanou v levém horním rohu',
  'tutorial.text':
    'Pokud je vaší lokalitě nebo oblasti přibližně 40 kilometrů od ní ve výhledu bouřek přiřazena barva, vysvětlivku k tomu, co daná barva znamená, najdete vlevo nahoře. Pokud se v oblasti Česka, Slovenska, Rakouska nebo Maďarska očekává silná nebo velmi silná bouřka, s největší pravděpodobností k ní vydáme varování v sekci Varování. UPOZORNĚNÍ: naše varování nejsou oficiální a nenahrazují národní meteorologické služby ani oficiální varování před počasím. Další nastavení můžete změnit v Nastavení.',
  'tutorial.ok': 'OK',

  'alertPopup.dialogLabel': 'Meteorologické varování',
  'alertPopup.ok': 'OK',
  'alertPopup.dontShowThisAlert': 'Toto varování příště nezobrazovat',
  'alertPopup.changeInSettings': 'Toto můžete změnit v Nastavení.',

  'updateLog.title': 'Seznam aktualizací',
  'updateLog.metaDesc': 'Co se změnilo v jednotlivých verzích webu ASFC.',
  'updateLog.moreUpdatesSoon': 'další aktualizace už brzy!',

  'notFound.title': 'Stránka nenalezena',
  'notFound.metaDesc': 'Tato stránka ASFC neexistuje.',
  'notFound.backToHomepage': 'Zpět na hlavní stránku',

  'language.default': 'Výchozí',
  'country.austria': 'Rakousko',
  'country.czechia': 'Česko',
  'country.slovakia': 'Slovensko',
  'country.hungary': 'Maďarsko',
  'home.archive': 'ARCHIV',
  'archive.rootTitle': 'Archiv',
  'archive.rootMetaDesc': 'Procházejte archivy varování a výhledů bouřek ASFC.',
  'archive.alertsArchive': 'Archiv varování',
  'archive.alertsArchiveMetaDesc': 'Dříve zveřejněné obrázky varování ASFC.',
  'archive.alertsArchiveEmptyHint': 'Zatím nejsou žádná archivovaná varování.',
  'language.german': 'Němčina',
}

const sk: Record<TranslationKey, string> = {
  'app.tagline': 'Amatérske centrum pre predpoveď búrok',

  'disclaimer.short':
    'Toto slúži iba na experimentálne účely a nenahrádza oficiálne výstrahy ani predpovede počasia.',

  'nav.sources': 'ZDROJE',
  'nav.outlook': 'VÝHĽAD BÚROK',
  'nav.alerts': 'VAROVANIA',

  'home.sourcesDesc': 'Radarové, satelitné a modelové snímky zo zdrojov, ktoré ASFC sleduje.',
  'home.outlookDesc': 'Experimentálne amatérske mapy výhľadu búrok zverejnené ASFC.',
  'home.alertsDesc':
    'Obrázky týkajúce sa nebezpečných poveternostných situácií. Oficiálne výstrahy vydávajú národné meteorologické služby, nie ASFC.',
  'home.settings': 'NASTAVENIA',
  'home.updateLog': 'ZOZNAM AKTUALIZÁCIÍ',
  'home.tutorial': 'NÁVOD',
  'home.metaDesc': 'ASFC — Amatérske centrum pre predpoveď búrok.',

  'header.backToHome': '← Späť na domovskú stránku',
  'header.menu': 'Menu',
  'header.close': 'Zavrieť',

  'footer.officialInfo':
    'Oficiálne výstrahy a predpovede vydávajú národné meteorologické služby. Obrázky a údaje patria ich príslušným vlastníkom.',

  'disclaimerDialog.text':
    'Upozornenie: Táto webová stránka slúži iba na experimentálne účely! Výstrahy, upozornenia a výhľady búrok nie sú oficiálne a nenahrádzajú oficiálne výstrahy. Ak je vydaná výstraha, overte si ju na oficiálnych výstražných platformách!',
  'disclaimerDialog.gotIt': 'Rozumiem!',
  'disclaimerDialog.dontShowAgain': 'Nabudúce nezobrazovať',

  'sources.title': 'Zdroje',
  'sources.metaDesc': 'Zdroje dát, ktoré ASFC sleduje: ECMWF, ALADIN a Deutscher Wetterdienst.',
  'sources.logoAlt': 'logo {name}',

  'outlook.chooserTitle': 'Výhľad búrok',
  'outlook.chooserMetaDesc':
    'Experimentálne amatérske výhľady búrok zverejnené ASFC pre Rakúsko, Česko, Slovensko a Maďarsko.',
  'outlook.forecastFor': 'VÝHĽAD PRE {country}',
  'outlook.pageMetaDesc': 'Aktuálny experimentálny výhľad búrok ASFC pre {country}.',
  'outlook.emptyHint': 'Pre {country} zatiaľ nebol zverejnený žiadny výhľad.',

  'archive.chooserTitle': 'Archív výhľadov',
  'archive.chooserMetaDesc':
    'Predtým zverejnené výhľady búrok ASFC pre Rakúsko, Česko, Slovensko a Maďarsko.',
  'archive.countryArchive': 'ARCHÍV VÝHĽADOV {country}',
  'archive.pageMetaDesc': 'Predtým zverejnené výhľady búrok ASFC pre {country}.',
  'archive.emptyHint': 'Pre {country} zatiaľ nie sú žiadne staršie výhľady.',

  'alerts.title': 'Varovania',
  'alerts.metaDesc': 'Obrázky nebezpečného počasia zverejnené ASFC.',
  'alerts.emptyHint': 'Zatiaľ neboli zverejnené žiadne varovania.',

  'common.loading': 'Načítava sa…',

  'settings.title': 'Nastavenia',
  'settings.metaDesc': 'Vyberte, čo vám ASFC zobrazí pri otvorení webu.',
  'settings.alertSettings': 'Nastavenia varovaní',
  'settings.showAlertPopups': 'Zobraziť okná s varovaním pri otvorení webu',
  'settings.on': 'zapnuté',
  'settings.off': 'vypnuté',
  'settings.alertsOnDesc': 'Varovania sa zobrazia v okne pri otvorení webu.',
  'settings.alertsOffDesc': 'Okná s varovaním zostanú skryté, kým ich znova nezapnete.',
  'settings.showHiddenAlerts': 'Znova zobraziť skryté varovania ({count})',
  'settings.showHiddenAlertsDesc':
    'Vráti späť varovania, ktoré ste skryli pomocou „Nabudúce toto varovanie nezobrazovať“.',
  'settings.selectCountry': 'Vyberte svoju krajinu',
  'settings.language': 'Jazyk',
  'settings.countryOpensStraightAway': 'Výhľad búrok sa otvorí rovno pre {country}.',
  'settings.clear': 'Zrušiť',
  'settings.resetSettings': 'Obnoviť predvolené nastavenia',

  'countryDialog.explain':
    'Vyberte svoju krajinu, aby ste automaticky dostávali výhľad búrok len pre vašu vybranú krajinu.',
  'countryDialog.ok': 'OK',
  'countryDialog.noThanks': 'Nie, ďakujem',
  'countryDialog.backToHome': 'Späť na domovskú stránku',

  'resetDialog.confirm': 'Naozaj chcete obnoviť predvolené nastavenia?',
  'resetDialog.no': 'Nie',
  'resetDialog.yes': 'Áno',

  'welcome.dialogLabel': 'Vitajte na ASFC',
  'welcome.ask': 'Vitajte na ASFC, chcete si prejsť rýchly návod?',
  'welcome.yes': 'Áno',
  'welcome.no': 'Nie',

  'tutorial.dialogLabel': 'Návod ASFC',
  'tutorial.imageAlt': 'Mapa výhľadu búrok s farebnou legendou zakrúžkovanou v ľavom hornom rohu',
  'tutorial.text':
    'Ak je vašej lokalite alebo oblasti približne 40 kilometrov od nej vo výhľade búrok priradená farba, vysvetlivku k tomu, čo daná farba znamená, nájdete vľavo hore. Ak sa v oblasti Slovenska, Česka, Rakúska alebo Maďarska očakáva silná alebo veľmi silná búrka, s najväčšou pravdepodobnosťou k nej vydáme varovanie v sekcii Varovania. UPOZORNENIE: naše varovania nie sú oficiálne a nenahrádzajú národné meteorologické služby ani oficiálne výstrahy pred počasím. Ďalšie nastavenia môžete zmeniť v Nastaveniach.',
  'tutorial.ok': 'OK',

  'alertPopup.dialogLabel': 'Meteorologické varovanie',
  'alertPopup.ok': 'OK',
  'alertPopup.dontShowThisAlert': 'Toto varovanie nabudúce nezobrazovať',
  'alertPopup.changeInSettings': 'Toto môžete zmeniť v Nastaveniach.',

  'updateLog.title': 'Zoznam aktualizácií',
  'updateLog.metaDesc': 'Čo sa zmenilo v jednotlivých verziách webu ASFC.',
  'updateLog.moreUpdatesSoon': 'ďalšie aktualizácie už čoskoro!',

  'notFound.title': 'Stránka nenájdená',
  'notFound.metaDesc': 'Táto stránka ASFC neexistuje.',
  'notFound.backToHomepage': 'Späť na domovskú stránku',

  'language.default': 'Predvolené',
  'country.austria': 'Rakúsko',
  'country.czechia': 'Česko',
  'country.slovakia': 'Slovensko',
  'country.hungary': 'Maďarsko',
  'home.archive': 'ARCHÍV',
  'archive.rootTitle': 'Archív',
  'archive.rootMetaDesc': 'Prehliadajte archívy varovaní a výhľadov búrok ASFC.',
  'archive.alertsArchive': 'Archív varovaní',
  'archive.alertsArchiveMetaDesc': 'Predtým zverejnené obrázky varovaní ASFC.',
  'archive.alertsArchiveEmptyHint': 'Zatiaľ nie sú žiadne archivované varovania.',
  'language.german': 'Nemčina',
}

const hu: Record<TranslationKey, string> = {
  'app.tagline': 'Amatőr Viharelőrejelző Központ',

  'disclaimer.short':
    'Ez az oldal kizárólag kísérleti célokat szolgál, és nem helyettesíti a hivatalos időjárás-figyelmeztetéseket vagy előrejelzéseket.',

  'nav.sources': 'FORRÁSOK',
  'nav.outlook': 'VIHARKILÁTÁS',
  'nav.alerts': 'FIGYELMEZTETÉSEK',

  'home.sourcesDesc': 'Radar-, műhold- és modellképek az ASFC által figyelt forrásokból.',
  'home.outlookDesc': 'Az ASFC által közzétett kísérleti amatőr viharkilátás-térképek.',
  'home.alertsDesc':
    'Súlyos időjárási helyzetekkel kapcsolatos képek. A hivatalos figyelmeztetéseket a nemzeti meteorológiai szolgálatok adják ki, nem az ASFC.',
  'home.settings': 'BEÁLLÍTÁSOK',
  'home.updateLog': 'FRISSÍTÉSI NAPLÓ',
  'home.tutorial': 'ÚTMUTATÓ',
  'home.metaDesc': 'ASFC — Amatőr Viharelőrejelző Központ.',

  'header.backToHome': '← Vissza a kezdőlapra',
  'header.menu': 'Menü',
  'header.close': 'Bezárás',

  'footer.officialInfo':
    'A hivatalos figyelmeztetéseket és előrejelzéseket a nemzeti meteorológiai szolgálatok adják ki. A képek és adatok a megfelelő tulajdonosaikat illetik.',

  'disclaimerDialog.text':
    'Figyelmeztetés: Ez a weboldal kizárólag kísérleti célokat szolgál! A figyelmeztetések, riasztások és viharkilátások nem hivatalosak, és nem helyettesítik a hivatalos figyelmeztetéseket. Ha figyelmeztetést adnak ki, mindig ellenőrizze azt a hivatalos figyelmeztető platformokon!',
  'disclaimerDialog.gotIt': 'Értem!',
  'disclaimerDialog.dontShowAgain': 'Ne mutasd többé',

  'sources.title': 'Források',
  'sources.metaDesc': 'Az ASFC által figyelt adatforrások: ECMWF, ALADIN és Deutscher Wetterdienst.',
  'sources.logoAlt': '{name} logója',

  'outlook.chooserTitle': 'Viharkilátás',
  'outlook.chooserMetaDesc':
    'Az ASFC által közzétett kísérleti amatőr viharkilátások Ausztriára, Csehországra, Szlovákiára és Magyarországra.',
  'outlook.forecastFor': 'ELŐREJELZÉS: {country}',
  'outlook.pageMetaDesc': 'Az ASFC jelenlegi kísérleti viharkilátása {country} területére.',
  'outlook.emptyHint': '{country} esetében még nem tettek közzé kilátást.',

  'archive.chooserTitle': 'Kilátás-archívum',
  'archive.chooserMetaDesc':
    'Az ASFC korábban közzétett viharkilátásai Ausztriára, Csehországra, Szlovákiára és Magyarországra.',
  'archive.countryArchive': '{country} KILÁTÁS-ARCHÍVUM',
  'archive.pageMetaDesc': 'Az ASFC korábban közzétett viharkilátásai {country} területére.',
  'archive.emptyHint': '{country} esetében még nincsenek régebbi kilátások.',

  'alerts.title': 'Figyelmeztetések',
  'alerts.metaDesc': 'Az ASFC által közzétett súlyos időjárási képek.',
  'alerts.emptyHint': 'Még nem tettek közzé figyelmeztetést.',

  'common.loading': 'Betöltés…',

  'settings.title': 'Beállítások',
  'settings.metaDesc': 'Válassza ki, mit mutasson az ASFC az oldal megnyitásakor.',
  'settings.alertSettings': 'Figyelmeztetési beállítások',
  'settings.showAlertPopups': 'Figyelmeztető ablakok megjelenítése az oldal megnyitásakor',
  'settings.on': 'be',
  'settings.off': 'ki',
  'settings.alertsOnDesc': 'A figyelmeztetések egy ablakban jelennek meg az oldal megnyitásakor.',
  'settings.alertsOffDesc': 'A figyelmeztető ablakok rejtve maradnak, amíg vissza nem kapcsolja.',
  'settings.showHiddenAlerts': 'Rejtett figyelmeztetések újbóli megjelenítése ({count})',
  'settings.showHiddenAlertsDesc':
    'Visszahozza a „Ne mutasd többé ezt a figyelmeztetést” gombbal elrejtett figyelmeztetéseket.',
  'settings.selectCountry': 'Válassza ki az országát',
  'settings.language': 'Nyelv',
  'settings.countryOpensStraightAway': 'A Viharkilátás rögtön {country} nézetét nyitja meg.',
  'settings.clear': 'Törlés',
  'settings.resetSettings': 'Beállítások visszaállítása',

  'countryDialog.explain':
    'Válassza ki az országát, hogy automatikusan csak a kiválasztott országra vonatkozó viharkilátást kapja.',
  'countryDialog.ok': 'OK',
  'countryDialog.noThanks': 'Nem, köszönöm',
  'countryDialog.backToHome': 'Vissza a kezdőlapra',

  'resetDialog.confirm': 'Biztosan visszaállítja a beállításokat?',
  'resetDialog.no': 'Nem',
  'resetDialog.yes': 'Igen',

  'welcome.dialogLabel': 'Üdvözöljük az ASFC-n',
  'welcome.ask': 'Üdvözöljük az ASFC-n! Szeretne egy gyors bemutatót?',
  'welcome.yes': 'Igen',
  'welcome.no': 'Nem',

  'tutorial.dialogLabel': 'ASFC útmutató',
  'tutorial.imageAlt': 'Viharkilátás-térkép a bal felső sarokban bekarikázott színmagyarázattal',
  'tutorial.text':
    'Ha az Ön helyszínéhez, vagy az attól kb. 40 kilométeren belüli területhez a viharkilátáson szín tartozik, a bal felső sarokban találja a jelmagyarázatot, hogy az adott szín mit jelent. Ha Csehország, Szlovákia, Ausztria vagy Magyarország területén súlyos vagy erős zivatar várható, arról valószínűleg figyelmeztetést adunk ki a Figyelmeztetések menüpontban. FIGYELMEZTETÉS: figyelmeztetéseink nem hivatalosak, és nem helyettesítik a nemzeti meteorológiai szolgálatokat vagy a hivatalos időjárás-figyelmeztetéseket. További beállításokat a Beállításokban módosíthat.',
  'tutorial.ok': 'OK',

  'alertPopup.dialogLabel': 'Időjárási figyelmeztetés',
  'alertPopup.ok': 'OK',
  'alertPopup.dontShowThisAlert': 'Ne mutasd többé ezt a figyelmeztetést',
  'alertPopup.changeInSettings': 'Ezt a Beállításokban módosíthatja.',

  'updateLog.title': 'Frissítési napló',
  'updateLog.metaDesc': 'Mi változott az ASFC weboldal egyes verzióiban.',
  'updateLog.moreUpdatesSoon': 'hamarosan további frissítések!',

  'notFound.title': 'Az oldal nem található',
  'notFound.metaDesc': 'Ez az ASFC oldal nem létezik.',
  'notFound.backToHomepage': 'Vissza a kezdőlapra',

  'language.default': 'Alapértelmezett',
  'country.austria': 'Ausztria',
  'country.czechia': 'Csehország',
  'country.slovakia': 'Szlovákia',
  'country.hungary': 'Magyarország',
  'home.archive': 'ARCHÍVUM',
  'archive.rootTitle': 'Archívum',
  'archive.rootMetaDesc': 'Böngéssze az ASFC figyelmeztetés- és viharkilátás-archívumait.',
  'archive.alertsArchive': 'Figyelmeztetés-archívum',
  'archive.alertsArchiveMetaDesc': 'Az ASFC korábban közzétett figyelmeztető képei.',
  'archive.alertsArchiveEmptyHint': 'Még nincsenek archivált figyelmeztetések.',
  'language.german': 'Német',
}

export const translations: Record<LanguageCode, Record<TranslationKey, string>> = {
  en,
  de,
  cs,
  sk,
  hu,
}

/** The translation key holding a country's name, e.g. "austria" -> "country.austria". */
export function countryTranslationKey(slug: string): TranslationKey {
  return `country.${slug}` as TranslationKey
}
