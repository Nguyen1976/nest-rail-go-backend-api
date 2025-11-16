# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

- trong typeorm có một bug gây khó chịu đó là giả sử khi tìm nhưng cái post có id là postId và postId = null thì nó sẽ lấy ra thằng đầu tiền trong csdl
