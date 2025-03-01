using System;
using System.Configuration;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Windows;
using System.Windows.Controls;

namespace RentRide
{
    public partial class UpdateCarPage : Page
    {
        private readonly HttpClient client = new HttpClient();
        private int carId;

        public UpdateCarPage(int id)
        {
            InitializeComponent();
            carId = id;
            LoadCarData();
        }

        private async void LoadCarData()
        {
            try
            {
                HttpResponseMessage response = await client.GetAsync($"http://localhost:5176/car/{carId}");
                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    var car = JsonSerializer.Deserialize<Car>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                    txtBrand.Text = car.Brand;
                    txtModel.Text = car.Model;
                    txtVNumber.Text = car.Number;
                    txtColor.Text = car.Color;
                    txtLocation.Text = car.Location;
                    txtPrice.Text = car.Price.ToString();
                }
                else
                {
                    MessageBox.Show("Failed to fetch car details.", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error loading car: " + ex.Message, "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private async void SaveUpdatedCar_Click(object sender, RoutedEventArgs e)
        {
            var updatedCar = new
            {
                brand = txtBrand.Text,
                model = txtModel.Text,
                vnumber = txtVNumber.Text,
                color = txtColor.Text,
                location = txtLocation.Text,
                price = decimal.TryParse(txtPrice.Text, out var price) ? price : 0
            };

            var json = JsonSerializer.Serialize(updatedCar);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            try
            {
                HttpResponseMessage response = await client.PutAsync($"http://localhost:5176/update/{carId}", content);

                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Car updated successfully!", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
                    NavigationService.GoBack();
                }
                else
                {
                    MessageBox.Show("Failed to update car.", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error updating car: " + ex.Message, "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }

    public class Carr
    {
        public int ID { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string Number { get; set; }
        public string Color { get; set; }
        public string Location { get; set; }
        public decimal Price { get; set; }
    }
}
