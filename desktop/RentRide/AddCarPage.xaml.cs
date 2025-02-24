using System;
using System.Configuration;
using System.Data;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media.Imaging;
using MySql.Data.MySqlClient;
using Microsoft.Win32;
using System.IO;
using CloudinaryDotNet.Actions;
using CloudinaryDotNet;

namespace RentRide
{
    public partial class AddCarPage : System.Windows.Controls.Page
    {
        private string? selectedImagePath;
        private string? imagePath;

        public AddCarPage()
        {
            InitializeComponent();
        }

        private void ChooseImage_Click(object sender, RoutedEventArgs e)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog();
            openFileDialog.Filter = "Image Files (*.png;*.jpg;*.jpeg)|*.png;*.jpg;*.jpeg";

            if (openFileDialog.ShowDialog() == true)
            {
                selectedImagePath = openFileDialog.FileName;
                imgPreview.Source = new BitmapImage(new Uri(selectedImagePath));
            }
        }

        private void SaveCar_Click(object sender, RoutedEventArgs e)
        {
            // Get Form Data
            string brand = txtBrand.Text;
            string model = txtModel.Text;
            string vnumber = txtVNumber.Text;
            string color = txtColor.Text;
            string location = txtLocation.Text;
            decimal price;
            if (!decimal.TryParse(txtPrice.Text, out price))
            {
                MessageBox.Show("Please enter a valid price.");
                return;
            }

            // Save Image and Get the Path
            string? imageUrl = UploadImageToCloudinary(selectedImagePath);

            if (string.IsNullOrEmpty(imageUrl))
            {
                MessageBox.Show("Failed to upload image.");
                return;
            }

            // Save to Database
            string connStr = ConfigurationManager.ConnectionStrings["MySqlConnection"].ConnectionString;
            using (MySqlConnection conn = new MySqlConnection(connStr))
            {
                try
                {
                    conn.Open();
                    string query = "INSERT INTO cars (Brand, Model, Number, Color, Location, Price, Image) " +
                                   "VALUES (@Brand, @Model, @Number, @Color, @Location, @Price, @Image)";
                    MySqlCommand cmd = new MySqlCommand(query, conn);
                    cmd.Parameters.AddWithValue("@Brand", brand);
                    cmd.Parameters.AddWithValue("@Model", model);
                    cmd.Parameters.AddWithValue("@Number", vnumber);
                    cmd.Parameters.AddWithValue("@Color", color);
                    cmd.Parameters.AddWithValue("@Location", location);
                    cmd.Parameters.AddWithValue("@Price", price);
                    cmd.Parameters.AddWithValue("@Image", imageUrl);

                    cmd.ExecuteNonQuery();
                    MessageBox.Show("Car added successfully!");
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Error: " + ex.Message);
                }
            }
        }
        // Function to Upload Image to Cloudinary
        private string? UploadImageToCloudinary(string? filePath)
        {
            try
            {
                // Cloudinary Configuration
                var cloudinary = new Cloudinary(new Account(
                    ConfigurationManager.AppSettings["CloudinaryCloudName"],
                    ConfigurationManager.AppSettings["CloudinaryApiKey"],
                    ConfigurationManager.AppSettings["CloudinaryApiSecret"]
                ));

                // Upload Image
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(filePath),
                    Folder = "CarRental" // Folder name in Cloudinary
                };

                var uploadResult = cloudinary.Upload(uploadParams);

                if (uploadResult.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    return uploadResult.SecureUrl.ToString();
                }
                else
                {
                    MessageBox.Show("Failed to upload image: " + uploadResult.Error.Message);
                    return null;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Cloudinary Error: " + ex.Message);
                return null;
            }
        }
    }
}
