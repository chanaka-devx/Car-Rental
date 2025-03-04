using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using CloudinaryDotNet.Core;
using System.Diagnostics;

namespace RentRide
{
    public partial class Login : Window
    {
        private static readonly HttpClient client = new HttpClient();

        public Login()
        {
            InitializeComponent();
        }

        private void SignUpButton_Click(object sender, RoutedEventArgs e)
        {
            // Specify the URL you want to navigate to
            string url = "http://localhost:3000/register"; 

            try
            {
                // Open the URL in the default web browser
                Process.Start(new ProcessStartInfo(url) { UseShellExecute = true });
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error opening the URL: {ex.Message}");
            }
        }

        private async void LoginButton_Click(object sender, RoutedEventArgs e)
        {
            string email = EmailTextBox.Text;
            string password = PasswordBox.Password;

            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
            {
                ShowError("Email and Password are required.");
                return;
            }

            // Create request payload
            var loginData = new { email, password };
            string jsonData = JsonConvert.SerializeObject(loginData);

            try
            {
                var response = await client.PostAsync("http://localhost:5176/auth/login",
                    new StringContent(jsonData, Encoding.UTF8, "application/json"));

                string responseBody = await response.Content.ReadAsStringAsync();
                var responseData = JsonConvert.DeserializeObject<LoginResponse>(responseBody);

                if (response.IsSuccessStatusCode)
                {
                    // Store token
                    Properties.Settings.Default.Token = responseData.Token;
                    Properties.Settings.Default.Role = responseData.Role;
                    Properties.Settings.Default.Save();

                    // Navigate to dashboard
                    OpenDashboard();
                }
                else
                {
                    ShowError(responseData.Message);
                }
            }
            catch (Exception ex)
            {
                ShowError("Login failed. Please check your internet connection.");
            }
        }

        private void ShowError(string message)
        {
            ErrorMessage.Text = message;
            ErrorMessage.Visibility = Visibility.Visible;
        }

        private void OpenDashboard()
        {
            MainWindow dashboard = new MainWindow();
            dashboard.Show();
            this.Close();
        }

    }

    public class LoginResponse
    {
        public string Token { get; set; }
        public string Role { get; set; }
        public string Message { get; set; }
    }
}
