export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  /** True while the image is a stand-in; flip to false when you add the couple's own photos. */
  placeholder: boolean;
}

export const galleryImages: GalleryImage[] = [
  { src: "/couple/couple-1.jpeg", alt: "The couple", caption: "Together", placeholder: false },
  { src: "/couple/couple-2.jpeg", alt: "The couple", caption: "Us", placeholder: false },
  { src: "/couple/couple-3.jpeg", alt: "The couple", caption: "Forever", placeholder: false },
  { src: "/couple/couple-4.jpeg", alt: "The couple", caption: "Moments", placeholder: false },
  { src: "/couple/couple-5.jpeg", alt: "The couple", caption: "Love", placeholder: false },
];
