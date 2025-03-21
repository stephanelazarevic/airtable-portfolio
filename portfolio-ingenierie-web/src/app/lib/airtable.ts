import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID as string
);

export async function getProjects() {
  const records = await base('Project').select({ view: 'Grid view' }).all();
  return records.map(record => ({
    id: record.id,
    ...record.fields
  }));
}

export async function getProjectById(id: string) {
  const record = await base('Project').find(id);
  return {
    id: record.id,
    ...record.fields
  };
}
