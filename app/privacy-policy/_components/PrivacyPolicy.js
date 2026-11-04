import Eyebrow from '@/components/ui/Eyebrow';
import styles from './PrivacyPolicy.module.css';

const LAST_UPDATED = '5 September 2026';

const INTRO_PARAGRAPHS = [
  'Buddha Skill Academy ("Buddha Skill Academy", "BSA", "we", "us" or "our"), operated by Buddha Skill Academy, having its registered or principal business address at 1/19, SK Arena Building, 2nd Floor, BDA Link Rd, Channasandra, Banashankari 5th Stage, Rajarajeshwari Nagar, Bengaluru, Karnataka 560098, is committed to protecting the privacy and personal information of students, learners, parents, guardians, instructors, visitors and other users of our website, learning platforms, applications and services.',
  'This Privacy Policy explains how we collect, use, store, process, disclose and protect personal information when you access or use https://buddhasskill.com, our learning management systems, online courses, training programmes, workshops, applications or other services offered by Buddha Skill Academy.',
  'By accessing or using our Services and providing personal information, you acknowledge the practices described in this Privacy Policy, subject to applicable law.',
  'This Privacy Policy is intended to be read in accordance with applicable Indian laws, including the Information Technology Act, 2000 and applicable rules made thereunder, and the Digital Personal Data Protection Act, 2023 and the Digital Personal Data Protection Rules, 2025, as and when the relevant provisions become applicable.',
];

const SECTIONS = [
  {
    id: 'scope',
    number: '1',
    title: 'Scope of This Privacy Policy',
    blocks: [
      { type: 'p', text: 'This Privacy Policy applies to information collected through:' },
      {
        type: 'ul',
        items: [
          "Buddha Skill Academy's website and web portals;",
          'student registration and admission forms;',
          'learning management systems (LMS);',
          'online and offline courses;',
          'webinars and workshops;',
          'live or recorded classes;',
          'student dashboards and accounts;',
          'examinations, assessments and assignments;',
          'certification programmes;',
          'enquiry and contact forms;',
          'email, telephone, SMS and WhatsApp communications;',
          'payment and subscription processes;',
          'placement, internship or career-assistance programmes, where applicable;',
          'feedback forms and surveys; and',
          'other services operated by or on behalf of Buddha Skill Academy.',
        ],
      },
      {
        type: 'p',
        text: 'Third-party websites or services accessible through our platform may have their own privacy policies. Users should review those policies separately.',
      },
    ],
  },
  {
    id: 'information-we-collect',
    number: '2',
    title: 'Information We May Collect',
    blocks: [
      {
        type: 'p',
        text: 'Depending on how you interact with Buddha Skill Academy, we may collect the following categories of information.',
      },
      { type: 'h3', text: '2.1 Personal and Contact Information' },
      { type: 'p', text: 'This may include:' },
      {
        type: 'ul',
        items: [
          'full name',
          'email address',
          'mobile number',
          'residential or correspondence address',
          'city, state and country',
          'date of birth or age',
          'gender, where relevant and voluntarily provided',
          'profile photograph',
          'parent or guardian details where the learner is a minor',
          'educational institution details',
          'occupation or professional information',
          'any other information voluntarily submitted by you',
        ],
      },
      { type: 'h3', text: '2.2 Educational and Academic Information' },
      { type: 'p', text: 'This may include:' },
      {
        type: 'ul',
        items: [
          'educational qualifications',
          'institution or college name',
          'course or programme selected',
          'enrolment information',
          'attendance records',
          'assignment submissions',
          'examination and assessment results',
          'scores and grades',
          'learning progress',
          'course completion status',
          'certificates obtained',
          'instructor feedback',
          'other academic or training-related records',
        ],
      },
      { type: 'h3', text: '2.3 Account Information' },
      { type: 'p', text: 'This may include:' },
      {
        type: 'ul',
        items: [
          'username',
          'registered mobile number or email address',
          'account preferences',
          'account activity',
          'authentication information',
        ],
      },
      {
        type: 'p',
        text: 'Passwords should be stored using appropriate security measures and should not be accessible in plain text to unauthorised persons.',
      },
      { type: 'h3', text: '2.4 Payment and Transaction Information' },
      {
        type: 'p',
        text: 'When you purchase a course, programme, subscription or other service, we may collect:',
      },
      {
        type: 'ul',
        items: [
          'transaction reference number',
          'payment status',
          'invoice and billing details',
          'amount paid',
          'payment method',
          'applicable tax-related information',
        ],
      },
      {
        type: 'p',
        text: 'Payments may be processed through authorised third-party payment gateways, banks or payment service providers, including [Payment Gateway(s) Used]. Buddha Skill Academy generally does not require users to provide full debit-card, credit-card, UPI PIN or banking authentication credentials directly to us. Such information may be handled by the relevant payment service provider.',
      },
      { type: 'h3', text: '2.5 Website and Technical Information' },
      { type: 'p', text: 'This may include:' },
      {
        type: 'ul',
        items: [
          'IP address',
          'browser type',
          'device type',
          'operating system',
          'approximate location derived from IP address',
          'pages viewed',
          'time spent on pages',
          'referring website',
          'login activity',
          'date and time of access',
          'device identifiers',
          'cookie identifiers',
          'website interaction and usage information',
        ],
      },
      { type: 'h3', text: '2.6 Communication Information' },
      { type: 'p', text: 'We may retain communications made with Buddha Skill Academy through:' },
      {
        type: 'ul',
        items: [
          'email',
          'telephone',
          'WhatsApp',
          'website forms',
          'chat systems',
          'support tickets',
          'social-media channels',
        ],
      },
      { type: 'h3', text: '2.7 Live Classes and Training Sessions' },
      {
        type: 'p',
        text: 'Class recording status: [Client to confirm — Yes / No / Some sessions only]. Where courses involve live online classes, webinars, mentoring sessions or classroom activities, Buddha Skill Academy may record sessions only where this is part of the programme or operational practice and learners are appropriately informed.',
      },
      { type: 'p', text: 'Where recordings are made, they may be used for purposes including:' },
      {
        type: 'ul',
        items: [
          'providing recorded lessons to enrolled students',
          'academic review',
          'training and quality improvement',
          'resolving student queries',
          'maintaining educational records',
        ],
      },
      { type: 'h3', text: '2.8 Placement and Career Information' },
      {
        type: 'p',
        text: 'Where Buddha Skill Academy provides placement, internship or career-support services, we may collect:',
      },
      {
        type: 'ul',
        items: [
          'resume/CV',
          'skills and qualifications',
          'employment history',
          'portfolio details',
          'interview performance',
          'preferred job location',
          'salary expectations',
          'other information required for placement assistance',
        ],
      },
      {
        type: 'p',
        text: 'Such information may be shared with prospective employers or recruitment partners where appropriate and subject to applicable consent and law.',
      },
    ],
  },
  {
    id: 'how-we-collect',
    number: '3',
    title: 'How We Collect Information',
    blocks: [
      { type: 'p', text: 'We may collect personal information:' },
      {
        type: 'ul',
        items: [
          'directly from you',
          'from your parent or legal guardian',
          'when you register for a course',
          'when you create an account',
          'when you make a payment',
          'when you submit an enquiry',
          'when you participate in a class or assessment',
          'when you contact customer support',
          'when you participate in surveys or promotional activities',
          'automatically through cookies and similar technologies',
          'through authorised educational, institutional, technology, recruitment or service partners where legally permitted',
        ],
      },
    ],
  },
  {
    id: 'how-we-use',
    number: '4',
    title: 'How We Use Your Information',
    blocks: [
      { type: 'h3', text: 'Educational Services' },
      {
        type: 'ul',
        items: [
          'registering and enrolling learners',
          'delivering courses and educational content',
          'conducting classes, assessments and examinations',
          'monitoring learning progress',
          'providing instructor support',
          'issuing certificates',
          'maintaining academic records',
          'improving educational programmes',
        ],
      },
      { type: 'h3', text: 'Account Administration' },
      {
        type: 'ul',
        items: [
          'creating and managing student accounts',
          'authenticating users',
          'responding to account-related requests',
          'providing technical support',
        ],
      },
      { type: 'h3', text: 'Payments and Administration' },
      {
        type: 'ul',
        items: [
          'processing payments',
          'generating invoices and receipts',
          'maintaining transaction records',
          'administering refunds, where applicable',
          'preventing fraudulent transactions',
        ],
      },
      { type: 'h3', text: 'Communications' },
      {
        type: 'ul',
        items: [
          'sending course-related communications',
          'class schedules and reminders',
          'examination notifications',
          'certificate notifications',
          'administrative announcements',
          'support communications',
          'important changes relating to our Services',
        ],
      },
      { type: 'h3', text: 'Marketing and Promotions' },
      {
        type: 'ul',
        items: [
          'new courses',
          'workshops',
          'webinars',
          'offers',
          'learning programmes',
          'events',
          'other services offered by Buddha Skill Academy',
        ],
      },
      { type: 'h3', text: 'Analytics and Improvement' },
      {
        type: 'ul',
        items: [
          'understanding how learners use our Services',
          'improving website performance',
          'improving course content',
          'analysing learning outcomes',
          'developing new courses and features',
          'diagnosing technical issues',
          'improving the overall student experience',
        ],
      },
      { type: 'h3', text: 'Safety, Security and Legal Requirements' },
      {
        type: 'ul',
        items: [
          'preventing fraud',
          'investigating misuse of our Services',
          'protecting students, employees and instructors',
          'securing our technology infrastructure',
          'enforcing our Terms and Conditions',
          'complying with legal obligations',
          'responding to lawful government or regulatory requests',
          'establishing, exercising or defending legal claims',
        ],
      },
      {
        type: 'p',
        text: 'Promotional communications are sent subject to applicable law and communication preferences, and users may request to stop receiving promotional messages.',
      },
    ],
  },
  {
    id: 'consent',
    number: '5',
    title: 'Consent and Your Choices',
    blocks: [
      {
        type: 'p',
        text: 'Where consent is required under applicable law, Buddha Skill Academy will seek appropriate consent before collecting or processing personal information.',
      },
      {
        type: 'p',
        text: 'You may choose not to provide certain information. However, some information may be necessary for us to provide a particular course, certificate, account, payment facility or other service.',
      },
      {
        type: 'p',
        text: 'Where processing is based on consent, you may request withdrawal of your consent, subject to applicable laws and legitimate requirements. Withdrawal will not affect processing lawfully undertaken before such withdrawal. If information is necessary to provide a particular Service, withdrawal may result in Buddha Skill Academy being unable to continue providing that Service.',
      },
    ],
  },
  {
    id: 'children',
    number: '6',
    title: 'Children and Learners Under 18 Years of Age',
    blocks: [
      {
        type: 'p',
        text: 'Minor enrolment status: [Client to confirm — Yes / No / Only with parent or guardian approval].',
      },
      {
        type: 'p',
        text: 'Where Buddha Skill Academy provides educational services to learners below 18 years of age, we may require the involvement and consent of a parent or legal guardian before collecting or processing personal information relating to the minor, where required under applicable law.',
      },
      {
        type: 'p',
        text: 'Parents and guardians should ensure that information provided on behalf of a child is accurate and should supervise the child’s use of our Services where appropriate.',
      },
      {
        type: 'p',
        text: 'Children’s personal information is intended to be used only to the extent reasonably necessary for purposes such as:',
      },
      {
        type: 'ul',
        items: [
          'enrolment',
          'delivery of educational services',
          'academic assessment',
          'student communication',
          'safety',
          'certification',
          'attendance',
          'administration',
          'other legitimate educational purposes',
        ],
      },
      {
        type: 'p',
        text: 'We do not intend to use children’s personal information for targeted advertising or other processing that is prohibited by applicable law. If a parent or guardian believes that a child’s information has been provided without appropriate authorisation, they may contact us using the details in this Policy.',
      },
    ],
  },
  {
    id: 'cookies',
    number: '7',
    title: 'Cookies and Similar Technologies',
    blocks: [
      { type: 'p', text: 'Our website may use cookies, pixels and similar technologies for:' },
      {
        type: 'ul',
        items: [
          'maintaining login sessions',
          'remembering user preferences',
          'website functionality',
          'security',
          'analytics',
          'performance measurement',
          'understanding visitor behaviour',
          'marketing or advertising, where permitted',
        ],
      },
      {
        type: 'p',
        text: 'Some cookies are necessary for the website to function correctly. Users may control or disable certain cookies through their browser settings, although this may affect certain website or learning-platform features. Where legally required, we will provide appropriate cookie choices or consent mechanisms.',
      },
    ],
  },
  {
    id: 'analytics',
    number: '8',
    title: 'Analytics and Third-Party Technologies',
    blocks: [
      {
        type: 'p',
        text: 'Buddha Skill Academy may use third-party technologies and service providers for purposes such as:',
      },
      {
        type: 'ul',
        items: [
          'website hosting',
          'cloud storage',
          'analytics',
          'video conferencing',
          'learning management',
          'email delivery',
          'SMS or WhatsApp communication',
          'customer support',
          'payment processing',
          'cybersecurity',
          'advertising',
          'other operational requirements',
        ],
      },
      {
        type: 'p',
        text: 'Current / intended providers should be confirmed by the client in the Client Information section. Examples may include analytics, video conferencing, cloud-hosting, payment and communication platforms depending upon the technology actually used by Buddha Skill Academy. Use of third-party services may also be subject to the respective provider’s privacy policy.',
      },
    ],
  },
  {
    id: 'sharing',
    number: '9',
    title: 'Sharing and Disclosure of Information',
    blocks: [
      { type: 'h3', text: 'Service Providers' },
      {
        type: 'p',
        text: 'Information may be provided to trusted vendors assisting with website hosting, LMS operations, payment processing, communications, cloud infrastructure, technical support, analytics, security, certification and other necessary business operations.',
      },
      { type: 'h3', text: 'Instructors and Academic Personnel' },
      {
        type: 'p',
        text: 'Relevant student information may be available to authorised instructors, mentors, evaluators or academic administrators where required to provide educational services.',
      },
      { type: 'h3', text: 'Business and Institutional Partners' },
      {
        type: 'p',
        text: 'Information may be shared with authorised educational or institutional partners where a course or programme is offered jointly or where such sharing is necessary to deliver the programme.',
      },
      { type: 'h3', text: 'Placement Partners' },
      {
        type: 'p',
        text: 'Where the learner has enrolled in or requested placement assistance, relevant professional information may be shared with prospective employers, recruitment agencies or placement partners.',
      },
      { type: 'h3', text: 'Legal and Regulatory Authorities' },
      {
        type: 'p',
        text: 'We may disclose information where required by applicable law, court order or a competent government authority, or where reasonably necessary for investigation of unlawful activity, cybersecurity, protection of rights or property, or safety.',
      },
      { type: 'h3', text: 'Business Transfers' },
      {
        type: 'p',
        text: 'If Buddha Skill Academy undergoes a merger, acquisition, restructuring, sale of business or transfer of assets, personal information may be transferred as part of the transaction subject to applicable legal requirements.',
      },
    ],
  },
  {
    id: 'sale',
    number: '10',
    title: 'Sale of Personal Information',
    blocks: [
      {
        type: 'p',
        text: "Buddha Skill Academy does not sell or rent students' personal information to third parties for monetary consideration. Where information is shared with service providers, instructors, institutions, placement partners or other authorised parties, such sharing will be for legitimate purposes connected with our Services or as otherwise permitted by applicable law.",
      },
    ],
  },
  {
    id: 'retention',
    number: '11',
    title: 'Data Retention',
    blocks: [
      { type: 'p', text: 'We retain personal information only for as long as reasonably required for:' },
      {
        type: 'ul',
        items: [
          'providing our Services',
          'maintaining student and academic records',
          'issuing and validating certificates',
          'accounting and taxation',
          'dispute resolution',
          'fraud prevention',
          'compliance with legal obligations',
          'other legitimate business purposes',
        ],
      },
      {
        type: 'p',
        text: 'Different categories of information may have different retention periods. Where information is no longer required and there is no lawful reason to retain it, we may securely delete, anonymise or otherwise dispose of it in accordance with applicable law and internal retention practices.',
      },
    ],
  },
  {
    id: 'security',
    number: '12',
    title: 'Data Security',
    blocks: [
      {
        type: 'p',
        text: 'Buddha Skill Academy takes reasonable administrative, organisational and technical measures intended to protect personal information against unauthorised access, misuse, alteration, disclosure, loss, destruction and cyber threats. Measures may include, where appropriate:',
      },
      {
        type: 'ul',
        items: [
          'access controls',
          'password protection',
          'encrypted communications',
          'secure servers',
          'restricted administrative access',
          'backups',
          'security monitoring',
          'periodic review of security practices',
        ],
      },
      {
        type: 'p',
        text: 'No electronic storage system, internet transmission or digital platform can be guaranteed to be completely secure. Users are responsible for keeping account passwords confidential and should immediately inform Buddha Skill Academy if they suspect unauthorised account access.',
      },
    ],
  },
  {
    id: 'breaches',
    number: '13',
    title: 'Personal Data Breaches',
    blocks: [
      {
        type: 'p',
        text: 'In the event of a personal-data breach, Buddha Skill Academy will take reasonable steps to:',
      },
      {
        type: 'ul',
        items: [
          'identify and contain the breach',
          'mitigate potential harm',
          'investigate the incident',
          'implement remedial measures',
          'provide notifications to affected individuals and/or appropriate authorities where required under applicable law',
        ],
      },
    ],
  },
  {
    id: 'storage-transfer',
    number: '14',
    title: 'Storage and Transfer of Information',
    blocks: [
      {
        type: 'p',
        text: 'Buddha Skill Academy may use cloud infrastructure, software providers and service providers whose servers or systems may be located within or outside India. Where personal information is transferred or processed outside India, we will endeavour to ensure that such transfer is made in accordance with applicable Indian laws and governmental requirements.',
      },
    ],
  },
  {
    id: 'your-rights',
    number: '15',
    title: 'Your Rights and Requests',
    blocks: [
      {
        type: 'p',
        text: 'Subject to applicable law and the commencement of relevant statutory provisions, you may have rights regarding your personal information, including the ability to request:',
      },
      {
        type: 'ul',
        items: [
          'information regarding the personal data processed about you',
          'correction of inaccurate information',
          'completion or updating of information',
          'deletion or erasure of information where legally applicable',
          'withdrawal of consent where processing is based on consent',
          'grievance redressal',
          'nomination or exercise of other rights available under applicable data-protection law',
        ],
      },
      {
        type: 'p',
        text: 'To make a request, please contact us using the details in the Contact Us section. We may need to verify your identity before processing certain requests. Certain information may need to be retained even after a deletion request where retention is required by law, necessary for academic records, necessary for preventing fraud or required for legal claims.',
      },
    ],
  },
  {
    id: 'updating',
    number: '16',
    title: 'Updating Your Information',
    blocks: [
      {
        type: 'p',
        text: 'Users are responsible for ensuring that information submitted to Buddha Skill Academy is accurate and up to date. You may request corrections or updates by contacting us or, where available, updating information through your account dashboard.',
      },
    ],
  },
  {
    id: 'marketing',
    number: '17',
    title: 'Marketing Communications',
    blocks: [
      {
        type: 'p',
        text: 'Where permitted by applicable law, Buddha Skill Academy may communicate with you through email, SMS, telephone, WhatsApp or other communication channels regarding courses, services, workshops, offers and events. You may opt out of promotional communications using an unsubscribe facility where available or by contacting us. Transactional, academic, security and important service-related communications may continue even where promotional communications have been disabled.',
      },
    ],
  },
  {
    id: 'third-party-links',
    number: '18',
    title: 'Third-Party Links',
    blocks: [
      {
        type: 'p',
        text: 'Our website or learning content may contain links to websites, applications or platforms operated by third parties. Buddha Skill Academy does not control the privacy practices or content of independent third-party websites. Users should review their privacy policies before providing personal information.',
      },
    ],
  },
  {
    id: 'social-media',
    number: '19',
    title: 'Social Media',
    blocks: [
      {
        type: 'p',
        text: 'Users may interact with Buddha Skill Academy through social-media platforms. Information submitted through such platforms may also be processed by the relevant social-media provider according to its own privacy policy.',
      },
    ],
  },
  {
    id: 'user-submissions',
    number: '20',
    title: 'Course Content and User Submissions',
    blocks: [
      {
        type: 'p',
        text: 'Students may submit assignments, projects, questions, comments, feedback or other materials while participating in our programmes. Such content may be processed for:',
      },
      {
        type: 'ul',
        items: [
          'academic evaluation',
          'instructor feedback',
          'plagiarism or integrity checks',
          'course administration',
          'educational improvement',
        ],
      },
      {
        type: 'p',
        text: 'Buddha Skill Academy will endeavour not to publicly disclose personally identifiable student work without appropriate authorisation, except where disclosure is reasonably necessary for the educational programme or permitted by law.',
      },
    ],
  },
  {
    id: 'automated-tech',
    number: '21',
    title: 'Automated Technologies and Artificial Intelligence',
    blocks: [
      {
        type: 'p',
        text: 'Buddha Skill Academy may use technological tools, including automated systems or artificial-intelligence-enabled services, to support functions such as course recommendations, student support, content delivery, analytics, assessment assistance, communication and administrative efficiency.',
      },
      {
        type: 'p',
        text: 'Where such technologies process personal information, we will endeavour to use them in accordance with applicable law and this Privacy Policy. We do not intend to make decisions producing significant adverse consequences for students solely through automated processing without appropriate human involvement where such involvement is required.',
      },
    ],
  },
  {
    id: 'changes',
    number: '22',
    title: 'Changes to This Privacy Policy',
    blocks: [
      {
        type: 'p',
        text: 'Buddha Skill Academy may amend this Privacy Policy periodically to reflect changes to our Services, technology, operational requirements or applicable laws and regulations. The revised Privacy Policy will be published on our website with an updated Last Updated date. Users are encouraged to review this page periodically. Where legally required, users may be separately informed of material changes.',
      },
    ],
  },
  {
    id: 'grievance',
    number: '23',
    title: 'Grievance Redressal',
    blocks: [
      {
        type: 'p',
        text: 'For questions, complaints or grievances regarding personal information or this Privacy Policy, users may contact the designated Grievance Officer / privacy contact:',
      },
      {
        type: 'table',
        rows: [
          ['Grievance Officer', '[Name of Grievance Officer]'],
          ['Organisation', 'Buddha Skill Academy'],
          ['Address', '1/19, SK Arena Building, 2nd Floor, BDA Link Rd, Channasandra, Banashankari 5th Stage, Rajarajeshwari Nagar, Bengaluru, Karnataka 560098'],
          ['Email', 'info@buddhasskill.com'],
          ['Phone', '+919886643333'],
        ],
      },
      {
        type: 'p',
        text: 'We will endeavour to acknowledge and resolve privacy-related grievances within the period prescribed under applicable Indian law.',
      },
    ],
  },
  {
    id: 'contact',
    number: '24',
    title: 'Contact Us',
    blocks: [
      {
        type: 'table',
        rows: [
          ['Organisation', 'Buddha Skill Academy'],
          ['Operated by', 'Buddha Skill Academy'],
          ['Address', '1/19, SK Arena Building, 2nd Floor, BDA Link Rd, Channasandra, Banashankari 5th Stage, Rajarajeshwari Nagar, Bengaluru, Karnataka 560098'],
          ['Email', 'info@buddhasskill.com'],
          ['Phone / Website', '+919886643333  |  https://buddhasskill.com'],
        ],
      },
    ],
  },
  {
    id: 'governing-law',
    number: '25',
    title: 'Governing Law',
    blocks: [
      {
        type: 'p',
        text: 'This Privacy Policy shall be governed by and interpreted in accordance with the applicable laws of India. Nothing in this Privacy Policy is intended to restrict any rights available to an individual under applicable data-protection or consumer-protection laws.',
      },
    ],
  },
];

function Block({ block }) {
  if (block.type === 'p') return <p className={styles.paragraph}>{block.text}</p>;
  if (block.type === 'h3') return <h3 className={styles.subheading}>{block.text}</h3>;
  if (block.type === 'ul') {
    return (
      <ul className={styles.list}>
        {block.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    );
  }
  if (block.type === 'table') {
    return (
      <dl className={styles.metaTable}>
        {block.rows.map(([k, v]) => (
          <div key={k} className={styles.metaRow}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    );
  }
  return null;
}

export default function PrivacyPolicy() {
  return (
    <section className={styles.page} aria-labelledby="privacy-title">
      <div className={styles.bgDecor} aria-hidden="true">
        <div className={styles.blobA} />
        <div className={styles.blobB} />
      </div>

      <div className={styles.inner}>
        <header className={styles.header}>
          <Eyebrow tone="ink" className={styles.eyebrow}>
            Legal
          </Eyebrow>
          <h1 id="privacy-title" className={styles.title}>
            Privacy <em>Policy</em>
          </h1>
          <p className={styles.updated}>
            <span className={styles.updatedLabel}>Last Updated</span>
            <span className={styles.updatedValue}>{LAST_UPDATED}</span>
          </p>
        </header>

        <div className={styles.intro}>
          {INTRO_PARAGRAPHS.map((p, i) => (
            <p key={i} className={styles.paragraph}>{p}</p>
          ))}
        </div>

        <div className={styles.sections}>
          {SECTIONS.map((section) => (
            <article
              key={section.id}
              id={section.id}
              className={styles.section}
              aria-labelledby={`${section.id}-title`}
            >
              <div className={styles.sectionHead}>
                <span className={styles.sectionNumber}>{section.number}</span>
                <h2 id={`${section.id}-title`} className={styles.sectionTitle}>
                  {section.title}
                </h2>
              </div>
              <div className={styles.sectionBody}>
                {section.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            </article>
          ))}
        </div>

        <aside className={styles.note} aria-label="Implementation note">
          <div className={styles.noteLabel}>Legal / Implementation Note</div>
          <p className={styles.noteText}>
            This document is a general privacy-policy template for an Indian
            EdTech business and should be customised to Buddha Skill Academy&rsquo;s
            actual data collection, technology stack, student age group, payment
            flow and vendor relationships before publication. It is not a
            substitute for advice from the client&rsquo;s legal or compliance
            professional.
          </p>
        </aside>
      </div>
    </section>
  );
}
