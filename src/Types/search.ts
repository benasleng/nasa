interface SharedData {
  title: string;
  description: string;
  location: string;
  nasa_id: string;
  photographer?: string;
}

export interface Data extends SharedData {
  center: string;
  date_created: Date;
  keywords: string[];
}

export interface Link {
  href: string;
  rel: string;
  render: string;
}

export interface Item {
  data: Data[];
  href: string;
  links: Link[];
}

export type Items = Item[]

export interface DropdownOption extends SharedData {
  previewImage: string;
  collectionUrl: string;
}

export interface ResponseData {
  collection: {
    items: Items;
    href: string;
  }
}