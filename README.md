# tibia-website

This is a Next.js project for developing a Tibia website using Server Actions, Tailwind CSS, and shadcn/ui.

## Features

- Server Actions for efficient data fetching and server-side logic.
- Tailwind CSS for styling and responsive design.
- Reusable UI components for a consistent user experience.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd MysticAAC
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up Prisma:**
   ```bash
   # Initialize Prisma
   pnpm prisma init

   # Generate Prisma Client from your schema
   pnpm prisma generate

   # Push the schema to your database (this will create/update tables)
   pnpm prisma db push
   ```

4. **Configure environment variables:**
   Create or edit `.env` file in the root directory:
   ```env
   DATABASE_URL="mysql://root:PASSWORD@localhost:3306/DATABASE_NAME"
   ```

5. **Run the development server:**
   ```bash
   pnpm build
   pnpm start
   ```

6. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Important Notes

- Make sure your MySQL server is running before running Prisma commands
- The `prisma db push` command will create all tables defined in `prisma/schema.prisma`
- Use `prisma studio` to verify your database structure and content

## Project Structure

- `src/app`: Contains the main application files including layout and pages.
- `src/components`: Contains reusable UI and layout components.
- `src/lib`: Contains utility functions.
- `src/types`: Contains TypeScript types and interfaces.
- `public`: Contains static assets.
- `tailwind.config.js`: Configuration for Tailwind CSS.
- `components.json`: Metadata for components.
- `package.json`: Project dependencies and scripts.
- `next.config.js`: Next.js configuration settings.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License. See the LICENSE file for details.