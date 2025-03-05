using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using Newtonsoft.Json;

namespace RentRide
{
    public partial class BookingsPage : Page
    {
        private static readonly HttpClient client = new HttpClient();

        public BookingsPage()
        {
            InitializeComponent();
            LoadBookings();
        }

        // Method to load bookings from the backend
        private async void LoadBookings()
        {
            try
            {
                HttpResponseMessage response = await client.GetAsync("http://localhost:5176/bookings");
                response.EnsureSuccessStatusCode();

                string responseBody = await response.Content.ReadAsStringAsync();
                var data = JsonConvert.DeserializeObject<ApiResponse>(responseBody);

                if (data.success)
                {
                    // Clear the existing bookings and add new cards
                    BookingsStackPanel.Children.Clear();

                    foreach (var booking in data.data)
                    {
                        var card = CreateBookingCard(booking);
                        BookingsStackPanel.Children.Add(card);
                    }
                }
                else
                {
                    MessageBox.Show("Error loading bookings.");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error: {ex.Message}");
            }
        }

        // Create a card (Border) for each booking
        private Border CreateBookingCard(Booking booking)
        {
            var card = new Border
            {
                Background = new System.Windows.Media.SolidColorBrush(System.Windows.Media.Colors.White),
                BorderBrush = new System.Windows.Media.SolidColorBrush(System.Windows.Media.Colors.Gray),
                BorderThickness = new System.Windows.Thickness(1),
                Margin = new System.Windows.Thickness(0, 0, 0, 20),
                CornerRadius = new System.Windows.CornerRadius(10),
                Padding = new System.Windows.Thickness(20)
            };

            var stackPanel = new StackPanel();
            stackPanel.Children.Add(CreateTextBlock($"Booking ID: {booking.id}", 16));
            stackPanel.Children.Add(CreateTextBlock($"Car ID: {booking.car_id}", 14));
            stackPanel.Children.Add(CreateTextBlock($"User Name: {booking.user_name}", 14));
            stackPanel.Children.Add(CreateTextBlock($"Email: {booking.user_email}", 14));
            stackPanel.Children.Add(CreateTextBlock($"Phone: {booking.user_phone}", 14));
            stackPanel.Children.Add(CreateTextBlock($"Date: {booking.booking_date}", 14));
            stackPanel.Children.Add(CreateTextBlock($"Time: {booking.booking_time}", 14));

            // Adding buttons for Accept/Decline
            var buttonPanel = new StackPanel
            {
                Orientation = Orientation.Horizontal,
                HorizontalAlignment = HorizontalAlignment.Center,
                Margin = new Thickness(5, 10, 5, 0)
            };

            // ===================== ACCEPT BUTTON =====================
            var acceptButton = new Button
            {
                Content = "Accept",
                Padding = new System.Windows.Thickness(15),
                Margin = new System.Windows.Thickness(10),
                Background = new System.Windows.Media.SolidColorBrush((System.Windows.Media.Color)System.Windows.Media.ColorConverter.ConvertFromString("#007bff")),
                Foreground = System.Windows.Media.Brushes.White,
                FontSize = 16,
                FontWeight = System.Windows.FontWeights.Bold,
                Width = 100,
                Height = 40
            };

            // Create a ControlTemplate for the Accept button with rounded corners
            ControlTemplate acceptTemplate = new ControlTemplate(typeof(Button));
            FrameworkElementFactory acceptBorder = new FrameworkElementFactory(typeof(Border));
            acceptBorder.SetValue(Border.BackgroundProperty, new System.Windows.Media.SolidColorBrush((System.Windows.Media.Color)System.Windows.Media.ColorConverter.ConvertFromString("#007bff")));
            acceptBorder.SetValue(Border.CornerRadiusProperty, new System.Windows.CornerRadius(10));
            acceptBorder.SetValue(Border.BorderBrushProperty, new System.Windows.Media.SolidColorBrush(System.Windows.Media.Colors.Blue));
            acceptBorder.SetValue(Border.BorderThicknessProperty, new System.Windows.Thickness(1));

            FrameworkElementFactory acceptContentPresenter = new FrameworkElementFactory(typeof(ContentPresenter));
            acceptContentPresenter.SetValue(ContentPresenter.HorizontalAlignmentProperty, HorizontalAlignment.Center);
            acceptContentPresenter.SetValue(ContentPresenter.VerticalAlignmentProperty, VerticalAlignment.Center);
            acceptContentPresenter.SetValue(ContentPresenter.ContentProperty, new TemplateBindingExtension(Button.ContentProperty));

            acceptBorder.AppendChild(acceptContentPresenter);
            acceptTemplate.VisualTree = acceptBorder;
            acceptButton.Template = acceptTemplate;

            acceptButton.Click += (sender, e) => HandleDecline(booking.id);


            // ===================== DECLINE BUTTON =====================
            var declineButton = new Button
            {
                Content = "Decline",
                Padding = new System.Windows.Thickness(15),
                Margin = new System.Windows.Thickness(10),
                Background = new System.Windows.Media.SolidColorBrush((System.Windows.Media.Color)System.Windows.Media.ColorConverter.ConvertFromString("#dc3545")),
                Foreground = System.Windows.Media.Brushes.White,
                FontSize = 16,
                FontWeight = System.Windows.FontWeights.Bold,
                Width = 100,
                Height = 40
            };

            // Create a ControlTemplate for the Decline button with rounded corners
            ControlTemplate declineTemplate = new ControlTemplate(typeof(Button));
            FrameworkElementFactory declineBorder = new FrameworkElementFactory(typeof(Border));
            declineBorder.SetValue(Border.BackgroundProperty, new System.Windows.Media.SolidColorBrush((System.Windows.Media.Color)System.Windows.Media.ColorConverter.ConvertFromString("#dc3545")));
            declineBorder.SetValue(Border.CornerRadiusProperty, new System.Windows.CornerRadius(10));
            declineBorder.SetValue(Border.BorderBrushProperty, new System.Windows.Media.SolidColorBrush(System.Windows.Media.Colors.Red));
            declineBorder.SetValue(Border.BorderThicknessProperty, new System.Windows.Thickness(1));

            FrameworkElementFactory declineContentPresenter = new FrameworkElementFactory(typeof(ContentPresenter));
            declineContentPresenter.SetValue(ContentPresenter.HorizontalAlignmentProperty, HorizontalAlignment.Center);
            declineContentPresenter.SetValue(ContentPresenter.VerticalAlignmentProperty, VerticalAlignment.Center);
            declineContentPresenter.SetValue(ContentPresenter.ContentProperty, new TemplateBindingExtension(Button.ContentProperty));

            declineBorder.AppendChild(declineContentPresenter);
            declineTemplate.VisualTree = declineBorder;
            declineButton.Template = declineTemplate;

            declineButton.Click += (sender, e) => HandleDecline(booking.id);


            // ===================== ADD BUTTONS TO PANEL =====================
            buttonPanel.Children.Add(acceptButton);
            buttonPanel.Children.Add(declineButton);



            stackPanel.Children.Add(buttonPanel);
            card.Child = stackPanel;

            return card;
        }

        // Helper method to create TextBlock for each line
        private TextBlock CreateTextBlock(string text, double fontSize)
        {
            return new TextBlock
            {
                Text = text,
                FontSize = fontSize,
                Foreground = new System.Windows.Media.SolidColorBrush(System.Windows.Media.Colors.Black),
                Margin = new System.Windows.Thickness(0, 5, 0, 5)
            };
        }

        private async void HandleAccept(int bookingId)
        {
            // Ask for confirmation
            var confirmAccept = MessageBox.Show($"Are you sure you want to accept Booking ID {bookingId}?", "Confirm", MessageBoxButton.YesNo);
            if (confirmAccept == MessageBoxResult.Yes)
            {
                try
                {
                    // Send DELETE request to remove booking from the database (modify this if needed for Accept logic)
                    HttpResponseMessage response = await client.DeleteAsync($"http://localhost:5176/bookings/{bookingId}");
                    response.EnsureSuccessStatusCode();

                    // Remove the card from the UI
                    var cardToDelete = BookingsStackPanel.Children.OfType<Border>()
                        .FirstOrDefault(card =>
                        {
                            var booking = card.Tag as Booking;
                            return booking != null && booking.id == bookingId;
                        });

                    // Check if the card was found and safely remove it
                    if (cardToDelete != null)
                    {
                        BookingsStackPanel.Children.Remove(cardToDelete);
                        MessageBox.Show($"Booking ID {bookingId} accepted successfully.");
                    }
                    else
                    {
                        MessageBox.Show("Booking card not found or has no associated data.");
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Error: {ex.Message}");
                }
            }
        }


        private async void HandleDecline(int bookingId)
        {
            // Ask for confirmation
            var confirmDelete = MessageBox.Show($"Are you sure you want to delete Booking ID {bookingId}?", "Confirm", MessageBoxButton.YesNo);
            if (confirmDelete == MessageBoxResult.Yes)
            {
                try
                {
                    // Send DELETE request to remove booking from the database
                    HttpResponseMessage response = await client.DeleteAsync($"http://localhost:5176/bookings/{bookingId}");
                    response.EnsureSuccessStatusCode();

                    // Remove the card from the UI
                    var cardToDelete = BookingsStackPanel.Children.OfType<Border>()
                        .FirstOrDefault(card => card.Tag is Booking booking && booking.id == bookingId);
                    if (cardToDelete != null)
                    {
                        BookingsStackPanel.Children.Remove(cardToDelete);
                    }

                    MessageBox.Show($"Booking ID {bookingId} deleted successfully.");
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Error: {ex.Message}");
                }
            }
        }


        // Go back to the Dashboard page
        private void BackToDashboard_Click(object sender, RoutedEventArgs e)
        {
            NavigationService.Navigate(new DashboardPage());
        }

        // Class to handle API response structure
        public class ApiResponse
        {
            public bool success { get; set; }
            public List<Booking> data { get; set; }
        }

        // Booking class to match the API response
        public class Booking
        {
            public int id { get; set; }
            public string car_id { get; set; }
            public string user_name { get; set; }
            public string user_email { get; set; }
            public string user_phone { get; set; }
            public string booking_date { get; set; }
            public string booking_time { get; set; }
        }
    }
}
