import { json } from '@remix-run/node';
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { db } from '~/db';
import { todos } from '~/db/schema';
import { eq } from 'drizzle-orm';

export async function loader({ request }: LoaderFunctionArgs) {
  const allTodos = await db.select().from(todos);
  return json(allTodos);
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, { status: 405 });
  }

  const formData = await request.formData();
  const intent = formData.get('intent');

  if (intent === 'create') {
    const title = formData.get('title')?.toString();
    const status = formData.get('status')?.toString() as 'past' | 'present' | 'future';
    
    if (!title) {
      return json({ error: 'Title is required' }, { status: 400 });
    }

    const newTodo = await db.insert(todos).values({
      title,
      status,
      description: formData.get('description')?.toString() || '',
    }).returning();

    return json(newTodo[0]);
  }

  if (intent === 'delete') {
    const id = formData.get('id')?.toString();
    if (!id) {
      return json({ error: 'ID is required' }, { status: 400 });
    }

    await db.delete(todos).where(eq(todos.id, parseInt(id)));
    return json({ success: true });
  }

  if (intent === 'update') {
    const id = formData.get('id')?.toString();
    const status = formData.get('status')?.toString() as 'past' | 'present' | 'future';
    
    if (!id || !status) {
      return json({ error: 'ID and status are required' }, { status: 400 });
    }

    await db.update(todos)
      .set({ status, updatedAt: new Date().toISOString() })
      .where(eq(todos.id, parseInt(id)));

    return json({ success: true });
  }

  return json({ error: 'Invalid intent' }, { status: 400 });
} 