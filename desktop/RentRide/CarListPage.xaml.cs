using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using MySql.Data.MySqlClient;

namespace RentRide
{
    public partial class CarListPage : Page
    {
        private readonly HttpClient client = new HttpClient();

        public CarListPage()
        {
            InitializeComponent();
            LoadCarData();
        }

        private void LoadCarData()
        {
            string connStr = ConfigurationManager.ConnectionStrings["MySqlConnection"].ConnectionString;
            List<Car> cars = new List<Car>();

            using (MySqlConnection conn = new MySqlConnection(connStr))
            {
                try
                {
                    conn.Open();
                    string query = "SELECT * FROM cars";
                    MySqlCommand cmd = new MySqlCommand(query, conn);
                    MySqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        cars.Add(new Car
                        {
                            ID = reader.GetInt32("ID"),
                            Brand = reader.GetString("Brand"),
                            Model = reader.GetString("Model"),
                            Number = reader.GetString("Number"),
                            Color = reader.GetString("Color"),
                            Location = reader.GetString("Location"),
                            Price = reader.GetDecimal("Price"),
                            ImageUrl = reader.GetString("Image")
                        });
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Error fetching cars: " + ex.Message);
                }
            }

            DisplayCars(cars);
        }

        private void DisplayCars(List<Car> cars)
        {
            CarListPanel.Children.Clear();

            foreach (var car in cars)
            {
                Border card = new Border
                {
                    Background = Brushes.White,
                    CornerRadius = new CornerRadius(10),
                    BorderThickness = new Thickness(1),
                    BorderBrush = Brushes.LightGray,
                    Width = 300,
                    Margin = new Thickness(10),
                    Padding = new Thickness(10)
                };

                StackPanel cardContent = new StackPanel { Orientation = Orientation.Vertical };

                // Car Image
                Image carImage = new Image
                {
                    Source = new BitmapImage(new Uri(car.ImageUrl)),
                    Width = 280,
                    Height = 150,
                    Margin = new Thickness(5),
                    Stretch = Stretch.UniformToFill
                };

                // Car Details
                TextBlock carTitle = new TextBlock
                {
                    Text = $"{car.Brand} {car.Model}",
                    FontWeight = FontWeights.Bold,
                    Foreground = Brushes.Black,
                    FontSize = 18,
                    TextAlignment = TextAlignment.Center,
                    Margin = new Thickness(5, 10, 5, 5)
                };

                TextBlock carDetails = new TextBlock
                {
                    Text = $"Vehicle No: {car.Number}\nColor: {car.Color}\nLocation: {car.Location}\nPrice: Rs.{car.Price}/Day",
                    Foreground = Brushes.Gray,
                    FontSize = 14,
                    TextAlignment = TextAlignment.Center,
                    Margin = new Thickness(5, 0, 5, 10)
                };

                // Buttons Panel
                StackPanel buttonPanel = new StackPanel
                {
                    Orientation = Orientation.Horizontal,
                    HorizontalAlignment = HorizontalAlignment.Center,
                    Margin = new Thickness(5, 10, 5, 0)
                };

                // ===================== UPDATE BUTTON =====================
                Button updateButton = new Button
                {
                    Content = "Update",
                    Width = 100,
                    Height = 40,
                    Margin = new Thickness(5),
                    Foreground = Brushes.White,
                    FontSize = 14,
                    FontWeight = FontWeights.Bold
                };

                // Create a ControlTemplate for the Update button
                ControlTemplate updateTemplate = new ControlTemplate(typeof(Button));
                FrameworkElementFactory updateBorder = new FrameworkElementFactory(typeof(Border));
                updateBorder.SetValue(Border.BackgroundProperty, new SolidColorBrush((Color)ColorConverter.ConvertFromString("#007bff")));
                updateBorder.SetValue(Border.CornerRadiusProperty, new CornerRadius(10));
                updateBorder.SetValue(Border.PaddingProperty, new Thickness(10));

                FrameworkElementFactory updateContentPresenter = new FrameworkElementFactory(typeof(ContentPresenter));
                updateContentPresenter.SetValue(ContentPresenter.HorizontalAlignmentProperty, HorizontalAlignment.Center);
                updateContentPresenter.SetValue(ContentPresenter.VerticalAlignmentProperty, VerticalAlignment.Center);

                updateBorder.AppendChild(updateContentPresenter);
                updateTemplate.VisualTree = updateBorder;
                updateButton.Template = updateTemplate;

                // Update Button Click Handler
                // Update Button Click Handler
                updateButton.Click += (s, e) =>
                {
                    // Ensure that Application.Current.MainWindow is of type MainWindow before casting
                    if (Application.Current.MainWindow is MainWindow mainWindow)
                    {
                        mainWindow.GetMainFrame().Navigate(new UpdateCarPage(car.ID));
                    }
                    else
                    {
                        // Handle the case where MainWindow is not the expected type (e.g., during design-time)
                        MessageBox.Show("MainWindow is not accessible.");
                    }
                };



                // ===================== DELETE BUTTON =====================
                Button deleteButton = new Button
                {
                    Content = "Delete",
                    Width = 100,
                    Height = 40,
                    Margin = new Thickness(5),
                    Foreground = Brushes.White,
                    FontSize = 14,
                    FontWeight = FontWeights.Bold
                };

                // Create a ControlTemplate for the Delete button
                ControlTemplate deleteTemplate = new ControlTemplate(typeof(Button));
                FrameworkElementFactory deleteBorder = new FrameworkElementFactory(typeof(Border));
                deleteBorder.SetValue(Border.BackgroundProperty, new SolidColorBrush((Color)ColorConverter.ConvertFromString("#dc3545")));
                deleteBorder.SetValue(Border.CornerRadiusProperty, new CornerRadius(10));
                deleteBorder.SetValue(Border.PaddingProperty, new Thickness(10));

                FrameworkElementFactory deleteContentPresenter = new FrameworkElementFactory(typeof(ContentPresenter));
                deleteContentPresenter.SetValue(ContentPresenter.HorizontalAlignmentProperty, HorizontalAlignment.Center);
                deleteContentPresenter.SetValue(ContentPresenter.VerticalAlignmentProperty, VerticalAlignment.Center);

                deleteBorder.AppendChild(deleteContentPresenter);
                deleteTemplate.VisualTree = deleteBorder;
                deleteButton.Template = deleteTemplate;

                // Delete Button Click Handler
                deleteButton.Click += async (s, e) => await DeleteCar(car.ID);


                // ===================== ADD BUTTONS TO PANEL =====================
                buttonPanel.Children.Add(updateButton);
                buttonPanel.Children.Add(deleteButton);


                // Add elements to card
                cardContent.Children.Add(carImage);
                cardContent.Children.Add(carTitle);
                cardContent.Children.Add(carDetails);
                cardContent.Children.Add(buttonPanel);
                card.Child = cardContent;

                // Add card to the panel
                CarListPanel.Children.Add(card);
            }
        }

        private void UpdateCar(int carId)
        {
            ((MainWindow)Application.Current.MainWindow).GetMainFrame().Navigate(new UpdateCarPage(carId));

        }

        private async System.Threading.Tasks.Task DeleteCar(int carId)
        {
            MessageBoxResult result = MessageBox.Show("Are you sure you want to delete this car?",
                                                      "Confirm Deletion", MessageBoxButton.YesNo, MessageBoxImage.Warning);
            if (result == MessageBoxResult.Yes)
            {
                try
                {
                    HttpResponseMessage response = await client.DeleteAsync($"http://localhost:5176/car/{carId}");

                    if (response.IsSuccessStatusCode)
                    {
                        MessageBox.Show("Car deleted successfully!", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
                        LoadCarData(); // Refresh car list
                    }
                    else
                    {
                        MessageBox.Show("Failed to delete car.", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Error deleting car: " + ex.Message, "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }
    }

    public class Car
    {
        public int ID { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string Number { get; set; }
        public string Color { get; set; }
        public string Location { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
    }
}
