const Admin = require('../models/Admin');
const Service = require('../models/Service');
const Content = require('../models/Content');

module.exports = async function seed() {
  // Seed Admin — use env credentials
  const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
  if (!adminExists) {
    await Admin.create({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD });
    console.log('✅ Admin seeded:', process.env.ADMIN_EMAIL);
  }

  // Seed Services
  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0) {
    await Service.insertMany([
      {
        title: 'Web Development',
        slug: 'web-development',
        description: 'We craft high-performance, scalable web applications tailored to your business goals. From dynamic corporate websites to complex enterprise platforms, our team delivers pixel-perfect, SEO-optimized solutions using the latest technologies.',
        features: [
          'Custom Website Design & Development',
          'Responsive & Mobile-First Layouts',
          'E-Commerce & Payment Integration',
          'CMS & Headless Architecture',
          'REST API & Third-Party Integrations',
          'Performance Optimization & SEO',
          'Progressive Web Apps (PWA)',
          'Ongoing Maintenance & Support'
        ],
        benefits: [
          'Expert Team with proven delivery track record',
          'Fast Delivery using Agile methodology',
          'Scalable Solutions that grow with your business',
          'Clean Code that is maintainable and well-documented',
          'Ongoing Support post-launch included',
          'Modern UI/UX crafted for real user engagement'
        ],
        techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Next.js', 'TypeScript'],
        icon: '🌐',
        order: 1
      },
      {
        title: 'Mobile App Development',
        slug: 'app-development',
        description: 'Transform your ideas into powerful mobile experiences. We build native and cross-platform mobile applications for iOS and Android that are intuitive, fast, and built to engage your users at every touchpoint.',
        features: [
          'iOS & Android Native Development',
          'Cross-Platform Apps (React Native & Flutter)',
          'UI/UX Design & Interactive Prototyping',
          'Push Notifications & Real-Time Features',
          'App Store & Play Store Deployment',
          'API Integration & Backend Services',
          'Offline Mode & Performance Optimization',
          'Post-Launch Maintenance & Updates'
        ],
        benefits: [
          'Expert Team with 50+ apps delivered',
          'Fast Delivery with streamlined onboarding',
          'Scalable Architecture for millions of users',
          'Clean Code with full IP transfer on completion',
          'Ongoing Support with regular updates',
          'Modern UI/UX that users love'
        ],
        techStack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'AWS'],
        icon: '📱',
        order: 2
      }
    ]);
    console.log('✅ Services seeded');
  }

  // Seed Content
  const heroExists = await Content.findOne({ section: 'hero' });
  if (!heroExists) {
    await Content.create({
      section: 'hero',
      heading: 'We Build Digital Products That Drive Business Growth',
      subheading: 'DynastyGlobalTech delivers exceptional digital experiences from first consultation to final launch. Web development, mobile apps, and custom software solutions.',
      ctaText: 'Start Your Project'
    });
  }

  const aboutExists = await Content.findOne({ section: 'about' });
  if (!aboutExists) {
    await Content.create({
      section: 'about',
      heading: 'About DynastyGlobalTech',
      subheading: 'Innovation. Excellence. Trust.',
      body: 'DynastyGlobalTech is a premier software development company helping businesses grow through innovative software solutions, modern websites, mobile apps, and digital transformation.\n\nFounded on the principles of quality and client-first thinking, we partner with startups, SMEs, and enterprises to build technology that makes a real difference. Our team of certified engineers and designers work collaboratively to deliver projects on time, within budget, and beyond expectations.\n\nFrom concept to deployment, we are your trusted technology partner.',
      certifications: []
    });
  }

  console.log('✅ Seed complete');
};
