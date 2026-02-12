import siteData from "../data/siteData.json";
import { slugify } from "./slugify";

export default function jsonLDGenerator({ type, post, url }) {
  // If the page has CMS data, use it.
  if (type === "post") {
    return `<script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "${url}"
        },
        "headline": "${post.title}",
        "description": "${post.description}",
        "image": "${post.image.src}",
        "author": {
          "@type": "Person",
          "name": "${post.author}",
          "url": "/author/${slugify(post.author)}"
        },
        "datePublished": "${post.date}"
      }
    </script>`;
  }
  return `<script type="application/ld+json">
      {
        "@context": "https://schema.org/",
        "@type": "ProfessionalService",
        "name": "compoz technologies",
        "description": "${siteData.description}",
        "url": "${import.meta.env.SITE}",
        "founder": {
          "@type": "Person",
          "name": "Paul Guirbal",
          "jobTitle": "Ingénieur logiciel freelance"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Toulouse",
          "addressCountry": "FR"
        },
        "areaServed": {
          "@type": "Country",
          "name": "France"
        },
        "knowsAbout": [
          "Développement logiciel sur mesure",
          "Développement mobile",
          "Applications iOS",
          "Applications Android",
          "Applications desktop",
          "Systèmes embarqués",
          "Raspberry Pi",
          "IoT",
          "Flutter",
          "React",
          "Python",
          "C"
        ],
        "priceRange": "$$",
        "sameAs": [
          "https://www.linkedin.com/in/paul-guirbal-4a6a978b"
        ]
      }
    </script>`;
}
