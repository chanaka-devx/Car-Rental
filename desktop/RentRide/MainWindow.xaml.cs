using System;
using System.Windows;
using System.Windows.Controls;


namespace RentRide
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            CheckAuthentication();
        }

        private void AddCarButton_Click(object sender, RoutedEventArgs e)
        {
            // Navigate to AddCarPage.xaml when the Add Car button is clicked
            MainFrame.NavigationService.Navigate(new AddCarPage());
        }

        private void DashboardButton_Click(object sender, RoutedEventArgs e)
        {
            // Navigate to DashboardPage
            MainFrame.Navigate(new DashboardPage());
        }

        private void BookingsButton_Click(object sender, RoutedEventArgs e)
        {
            // Navigate to the BookingsPage
            MainFrame.Navigate(new BookingsPage());
        }

        private void CarListButton_Click(object sender, RoutedEventArgs e)
        {
            MainFrame.Navigate(new CarListPage());
        }
        public Frame GetMainFrame()
        {
            return MainFrame;
        }



        private void CheckAuthentication()
        {
            if (string.IsNullOrEmpty(Properties.Settings.Default.Token))
            {
                MessageBox.Show("You must log in first!", "Authentication Error", MessageBoxButton.OK, MessageBoxImage.Warning);
                OpenLoginPage();
            }
        }

        private void OpenLoginPage()
        {
            Login loginPage = new Login();
            loginPage.Show();
            this.Close();
        }

        private void LogoutButton_Click(object sender, RoutedEventArgs e)
        {
            Properties.Settings.Default.Token = "";
            Properties.Settings.Default.Role = "";
            Properties.Settings.Default.Save();

            Login loginPage = new Login();
            loginPage.Show();
            this.Close();
        }

    }
}
