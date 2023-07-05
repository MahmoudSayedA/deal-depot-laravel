# DEAL DEPOT

Welcome to Deal Depot, the ultimate destination for buying and selling used products online. Our platform connects buyers and sellers from all over the world, making it easy to find great deals on pre-owned goods.

## Installation

To install and run Deal Depot on your local machine, you'll need to have PHP, Composer, and a database management system like MySQL or PostgreSQL installed.

Clone the project repository from Git: `git clone https://github.com/MahmoudSayedA/deal-depot.git`
Navigate to the project directory: `cd deal-depot`
Copy the .env.example file to .env: `cp .env.example .env`
Generate a new application key: `php artisan key:generate`
Update the **.env** file with your database configuration and other settings.
Install the project dependencies: `composer install`
Run the database migrations: `php artisan migrate`
Start the Laravel development server: `php artisan serv`
Once you have completed these steps, you should be able to access the application by navigating to http://localhost:8000 in your web browser.

## Usage

To use Deal Depot, you can create an account as a buyer or a seller. As a buyer, you can browse the listings of pre-owned goods and make offers on the items you're interested in. As a seller, you can list your own items for sale and wait for interested buyers to make offers.

Once a buyer has made an offer on your item, you can choose to accept or reject the offer. If you accept the offer, the buyer will be responsible for making payment through the secure payment system provided by Deal Depot. Once the payment has been received, you can ship the item to the buyer.

## Contributing

If you'd like to contribute to the development of Deal Depot, you can fork the project repository and submit a pull request with your changes. We welcome contributions of all kinds, including bug fixes, new features, and improvements to the documentation.

## License

Deal Depot is open source software licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contact

If you have any questions or comments about Deal Depot, please contact us at support@dealdepot.com. We'd love to hear from you!
**_note_**:- the email services is not available yet, it will be available soon
