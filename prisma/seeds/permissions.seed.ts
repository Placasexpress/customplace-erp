import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const permissions = [
    { name: 'READ_PRODUCT', category: 'Product' },
    { name: 'WRITE_PRODUCT', category: 'Product' },
    { name: 'EDIT_PRODUCT', category: 'Product' },
    { name: 'CREATE_PRODUCT', category: 'Product' },
    { name: 'READ_FINANCE', category: 'Finance' },
    { name: 'WRITE_FINANCE', category: 'Finance' },
    { name: 'EDIT_FINANCE', category: 'Finance' },
    { name: 'CREATE_FINANCE', category: 'Finance' },
    { name: 'READ_REPORTS', category: 'Reports' },
    { name: 'WRITE_REPORTS', category: 'Reports' },
    { name: 'EDIT_REPORTS', category: 'Reports' },
    { name: 'CREATE_REPORTS', category: 'Reports' },
    { name: 'READ_TAX', category: 'Tax' },
    { name: 'WRITE_TAX', category: 'Tax' },
    { name: 'EDIT_TAX', category: 'Tax' },
    { name: 'CREATE_TAX', category: 'Tax' },
    { name: 'READ_USERS', category: 'Users' },
    { name: 'WRITE_USERS', category: 'Users' },
    { name: 'EDIT_USERS', category: 'Users' },
    { name: 'CREATE_USERS', category: 'Users' },
    { name: 'READ_COMPANY', category: 'Company' },
    { name: 'WRITE_COMPANY', category: 'Company' },
    { name: 'EDIT_COMPANY', category: 'Company' },
    { name: 'CREATE_COMPANY', category: 'Company' },
    { name: 'READ_STEP', category: 'Step' },
    { name: 'WRITE_STEP', category: 'Step' },
    { name: 'EDIT_STEP', category: 'Step' },
    { name: 'CREATE_STEP', category: 'Step' },
    { name: 'READ_ORDER', category: 'Order' },
    { name: 'WRITE_ORDER', category: 'Order' },
    { name: 'EDIT_ORDER', category: 'Order' },
    { name: 'CREATE_ORDER', category: 'Order' },
    { name: 'APPROVE_ORDER', category: 'Order' },
    { name: 'READ_CLIENT', category: 'Client' },
    { name: 'WRITE_CLIENT', category: 'Client' },
    { name: 'EDIT_CLIENT', category: 'Client' },
    { name: 'CREATE_CLIENT', category: 'Client' },
    { name: 'READ_CATEGORY', category: 'Category' },
    { name: 'WRITE_CATEGORY', category: 'Category' },
    { name: 'EDIT_CATEGORY', category: 'Category' },
    { name: 'CREATE_CATEGORY', category: 'Category' },
  ];

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: { name: permission.name },
      update: {},
      create: permission,
    });
  }

  console.log('Permissions seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
