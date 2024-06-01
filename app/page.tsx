import { path } from '@/lib/utils';
import ItemCard from '@/components/screens/item-card';
import { User } from 'next-auth';
import axios from 'axios';
import getItems from '@/actions/getItems';

interface Item {
  id: string;
  name?: string;
  description?: string;
  basePrice?: number;
  active: boolean;
  endedAt?: Date;
  userId: string;
  user: User;
  media: Media[];
  bids: Bid[];
  createdAt: Date;
  updatedAt: Date;
}

interface Media {
  id: string;
  resource_type: string;
  secure_url: string;
  itemId: string;
  item: Item;
}

interface Bid {
  id: string;
  amount: number;
  itemId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  item: Item;
  user: User;
}


export default async function Home() {
  const items: Item[] = await getItems();

  return (
    <>
      <div className="flex items-center justify-center flex-wrap gap-10">
        {items?.map((item, index) => (
          <ItemCard key={index} item={item} />
        ))}
      </div>

    </>
  );
}
