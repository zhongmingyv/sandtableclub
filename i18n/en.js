'use strict';
window.I18N = window.I18N || {};
window.I18N.en = {
  langName: 'English',
  common: {
    brand: 'SandTable Club',
    nav: { home: 'Home', crowd: 'Crowdfunding', terms: 'Terms of Service', disclaimer: 'Disclaimer' },
    crowdBar: {
      strong: 'Crowdfunding live',
      text: ' — support the ongoing development of SandTable Club and unlock multiplayer servers and more creation tools',
      cta: 'Learn more →',
    },
    contactLabel: 'Contact us',
    footerCopy: '© 2026 SandTable Club sandtable.club — Creators are solely responsible for their user-generated content.',
  },
  home: {
    title: 'SandTable Club - Campaign Simulator & Wargame Platform',
    metaDesc: 'SandTable Club (sandtable.club): a campaign simulator and build-your-own-rules wargame platform. Solo creation, AI-assisted authoring, online battles.',
    heroAlt: 'SandTable Club sandtable.club banner',
    heroTitle: 'SandTable Club',
    tagline: 'Campaign Simulator · Build-Your-Own-Rules Wargame Platform',
    about: {
      title: 'What is this software?',
      html: 'SandTable Club is a <strong>campaign simulator and tabletop-wargame-style strategy platform</strong>. It does not ship one fixed game — it hands the power of game-making to you: define unit attributes, stat formulas, map terrain, trigger rules and UI in the editor, build your own campaign like laying out a real sand table, then playtest it solo or battle other players online.',
    },
    cards: [
      { cls: 'blue', title: 'Solo · Creation Mode', text: 'Built-in property editor: templates, stat tables, formulas, triggers, maps and UI — all visually editable. Start from a blank sand table and build a complete, playable campaign ruleset.' },
      { cls: 'gold', title: 'AI-Assisted Authoring', text: 'An LLM-powered maker assistant: describe the gameplay you want in natural language, and the AI generates templates, fills in stats and lays out maps, dramatically lowering the creation barrier.' },
      { cls: 'red', title: 'Battle · Online Mode', text: 'Sign in to the battle platform, upload your campaign, create or join rooms to play against others, with replay and spectating — or let an AI take a seat and spar with you.' },
    ],
    crowd: {
      secTitle: 'Crowdfunding',
      panelTitle: 'Why crowdfund?',
      p1: 'SandTable Club is built by an independent developer. Multiplayer servers, LLM usage for the AI maker assistant, and continued tooling work all require sustained investment. All proceeds will go to:',
      items: [
        'Deploying and operating the battle servers long-term;',
        'Model integration and optimization for AI-assisted authoring;',
        'Feature iteration and bug fixes for the editor and battle platform;',
        'Building the creator community and content-sharing features.',
      ],
      p2: 'Backers receive tier rewards (early access, exclusive badges, creator support, etc. — as published on the crowdfunding page).',
      btn: 'Support us on the crowdfunding page',
      btnTitle: 'Crowdfunding page coming soon',
      note: 'The crowdfunding entry opens soon — watch this page for updates.',
    },
  },
  terms: {
    title: 'Terms of Service - SandTable Club',
    docTitle: 'Terms of Service',
    updated: 'Last updated: July 10, 2026',
    intro: 'Welcome to SandTable Club (the "Software" or the "Platform"). Please read these Terms carefully before registering, downloading, installing or using the Software. By using the Software you are deemed to have read, understood and agreed to these Terms and the <a href="disclaimer.html">Disclaimer</a> in full.',
    sections: [
      { title: '1. Services', blocks: [
        { t: 'p', h: 'The Platform provides the following services:' },
        { t: 'ol', items: [
          'Campaign editor: for creating and editing user-made content such as game templates, stats, formulas, maps, trigger rules and UI;',
          'AI-assisted authoring: creation assistance via third-party large language model services;',
          'Online battles: uploading works, creating/joining matches, replays and spectating;',
          'Other services agreed in crowdfunding rewards.',
        ] },
      ] },
      { title: '2. Accounts and Conduct', blocks: [
        { t: 'ol', items: [
          'Users are responsible for all activity under their account and may not lend, rent or transfer the account to others;',
          'Users may not use the Platform for any activity that violates the laws of the user\'s jurisdiction or any other applicable laws;',
          'Users may not use the Platform to distribute unlawful, obscene, violent, terrorist, gambling-related or defamatory content;',
          'Users may not decompile or crack the Software, attack the servers, or interfere with other users\' normal use.',
        ] },
      ] },
      { title: '3. User-Generated Content (UGC)', blocks: [
        { t: 'hl', ps: [
          '<strong>The Platform is a neutral creation tool and information storage service.</strong> All content users create, upload or publish on the Platform — including but not limited to gameplay rules, stat designs, formulas, maps, images, text, audio and other assets (collectively "User Content") — is made or uploaded by users themselves, and <strong>users alone warrant its legality, originality and intellectual-property status, and bear full legal responsibility for it.</strong> See the <a href="disclaimer.html">Disclaimer</a>.',
        ] },
        { t: 'ol', items: [
          'Users warrant that they hold lawful rights to the User Content they upload, or have obtained authorization from the rights holders;',
          'Users must not plagiarize or use without permission the gameplay expression, stat systems, images or other assets in which others hold copyright or other lawful rights;',
          'Copyright in User Content remains with its creator; users grant the Platform a non-exclusive license to store, display and transmit it as necessary to provide the services;',
          'Where User Content is alleged to infringe, the Platform may take down, delete or block the content under the notice-and-takedown rule, and may warn, restrict or ban the account depending on severity.',
        ] },
      ] },
      { title: '4. Intellectual Property', blocks: [
        { t: 'ol', items: [
          'Intellectual property in the Software itself — its code, interface design, trademarks ("SandTable Club", "sandtable.club", etc.) and official assets — belongs to the developer;',
          'No one may copy, modify or distribute the Software itself, or use it for commercial purposes, without permission;',
          'Ownership of and responsibility for User Content are governed by Section 3 and the Disclaimer.',
        ] },
      ] },
      { title: '5. Crowdfunding', blocks: [
        { t: 'ol', items: [
          'Crowdfunding is a sponsorship of development work, not a pre-sale contract; rewards are as published on the crowdfunding page;',
          'The developer will make reasonable efforts to deliver rewards on schedule; delays caused by force majeure or reasonable development changes will be announced promptly;',
          'Use of crowdfunding proceeds is as published on the crowdfunding page.',
        ] },
      ] },
      { title: '6. Changes, Suspension and Termination of Service', blocks: [
        { t: 'ol', items: [
          'The Platform may change, suspend or terminate some or all services based on operational circumstances, with advance notice where possible;',
          'The Platform bears no liability for changes to, interruption or termination of free services;',
          'If a user breaches these Terms, the Platform may suspend or terminate service to that user.',
        ] },
      ] },
      { title: '7. Amendments', blocks: [
        { t: 'p', h: 'The Platform may amend these Terms from time to time; amended Terms will be published on this page. Continued use of the Software after amendment constitutes acceptance of the amended Terms.' },
      ] },
      { title: '8. Governing Law and Disputes', blocks: [
        { t: 'p', h: 'Disputes arising from these Terms shall first be resolved through friendly negotiation; failing that, either party may bring an action before the competent court at the developer\'s place of residence, and the laws of the developer\'s place of residence shall apply.' },
      ] },
    ],
  },
  disclaimer: {
    title: 'Disclaimer - SandTable Club',
    docTitle: 'Disclaimer',
    updated: 'Last updated: July 10, 2026',
    intro: 'This Disclaimer forms part of the <a href="terms.html">Terms of Service</a>. By using SandTable Club (the "Software" or the "Platform") you are deemed to have read, understood and agreed to this Disclaimer in full.',
    sections: [
      { title: '1. Nature of the Platform: a Neutral Creation Tool and Storage Service', blocks: [
        { t: 'p', h: 'The Software is a <strong>general-purpose creation tool</strong> with which users author their own campaign rules, stats, maps and interfaces; its online service merely provides <strong>information storage and transmission</strong> for user works. The Platform does not pre-make, produce, edit or promote any specific user work, and has no obligation to pre-screen user uploads.' },
      ] },
      { title: '2. Liability for Infringing User Content (Key Clause)', blocks: [
        { t: 'hl', ps: [
          '<strong>All content users create, upload or publish on the Platform — including but not limited to gameplay rules, mechanics, stat designs, formulas, maps, images, art assets, text and audio — is made or uploaded by the users themselves.</strong>',
          '<strong>If a user plagiarizes, imitates, copies or otherwise uses without authorization another game\'s gameplay expression, stat systems, images or other legally protected content, all resulting legal consequences (including but not limited to civil, administrative or even criminal liability for copyright infringement, unfair competition, trademark infringement, etc.) are borne solely by that user and are unrelated to the Platform.</strong>',
          'Under internationally recognized <strong>"safe harbor" principles</strong>, the Platform, as a neutral network service provider, <strong>bears no liability for infringement damages</strong> where it neither knows nor should know that user content infringes, and takes necessary measures promptly upon receiving a qualified notice from the rights holder.',
        ] },
      ] },
      { title: '3. Infringement Notices (Notice-and-Takedown)', blocks: [
        { t: 'p', h: 'A rights holder who believes user content on the Platform infringes their lawful rights may submit a written notice to us, which must include:' },
        { t: 'ol', items: [
          'The rights holder\'s name and contact details;',
          'The exact name and location of the allegedly infringing content to be removed or delinked (e.g. work title, room ID, page link);',
          'Prima facie evidence of infringement (proof of ownership, an infringement comparison, etc.);',
          'A written assurance of the notice\'s truthfulness, accepting legal liability for losses caused to others by a false notice.',
        ] },
        { t: 'p', h: 'Upon receiving a qualified notice, the Platform will promptly delete, block or delink the allegedly infringing content and forward the notice to the providing user. The notified user may lawfully submit a written counter-notice asserting non-infringement.' },
      ] },
      { title: '4. AI-Generated Content', blocks: [
        { t: 'p', h: 'The Software\'s AI-assisted authoring features rely on third-party large language model services. AI-generated content is reviewed, adopted and published by the user who initiated the generation; that user is deemed the provider of the content and is responsible for its legality. The Platform does not warrant the accuracy, originality or legality of AI-generated content.' },
      ] },
      { title: '5. General Disclaimers', blocks: [
        { t: 'ol', items: [
          'The Software is provided "as is", without express or implied warranties of stability, freedom from errors, or fitness for a particular purpose;',
          'The Platform is not liable for service unavailability or data loss caused by force majeure, network failures, or interruption of third-party services (including cloud and LLM providers);',
          'Disputes between users, or between users and third parties, arising from user content shall be resolved by the parties themselves; the Platform may provide necessary assistance (e.g. lawfully providing necessary information about an infringing user);',
          'User works on the Platform represent only their creators\' views, not the Platform\'s position.',
        ] },
      ] },
      { title: '6. Amendments and Effect', blocks: [
        { t: 'p', h: 'The Platform may amend this Disclaimer from time to time and publish it on this page. Where this Disclaimer conflicts with the Terms of Service, this Disclaimer prevails. If any provision is held invalid, the remaining provisions remain in effect.' },
      ] },
    ],
  },
};
