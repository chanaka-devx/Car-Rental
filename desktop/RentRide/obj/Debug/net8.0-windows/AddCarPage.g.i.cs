﻿#pragma checksum "..\..\..\AddCarPage.xaml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "A5103C47A6DE2F3F4C32B94743A20BFDE09DF528"
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using System.Diagnostics;
using System.Windows;
using System.Windows.Automation;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Controls.Ribbon;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Markup;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Effects;
using System.Windows.Media.Imaging;
using System.Windows.Media.Media3D;
using System.Windows.Media.TextFormatting;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Windows.Shell;


namespace RentRide {
    
    
    /// <summary>
    /// AddCarPage
    /// </summary>
    public partial class AddCarPage : System.Windows.Controls.Page, System.Windows.Markup.IComponentConnector {
        
        
        #line 25 "..\..\..\AddCarPage.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBox txtBrand;
        
        #line default
        #line hidden
        
        
        #line 47 "..\..\..\AddCarPage.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBox txtModel;
        
        #line default
        #line hidden
        
        
        #line 69 "..\..\..\AddCarPage.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBox txtVNumber;
        
        #line default
        #line hidden
        
        
        #line 91 "..\..\..\AddCarPage.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBox txtColor;
        
        #line default
        #line hidden
        
        
        #line 113 "..\..\..\AddCarPage.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBox txtLocation;
        
        #line default
        #line hidden
        
        
        #line 135 "..\..\..\AddCarPage.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBox txtPrice;
        
        #line default
        #line hidden
        
        
        #line 158 "..\..\..\AddCarPage.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Button btnChooseFile;
        
        #line default
        #line hidden
        
        
        #line 182 "..\..\..\AddCarPage.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBlock txtImagePath;
        
        #line default
        #line hidden
        
        
        #line 183 "..\..\..\AddCarPage.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Image imgPreview;
        
        #line default
        #line hidden
        
        private bool _contentLoaded;
        
        /// <summary>
        /// InitializeComponent
        /// </summary>
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [System.CodeDom.Compiler.GeneratedCodeAttribute("PresentationBuildTasks", "9.0.0.0")]
        public void InitializeComponent() {
            if (_contentLoaded) {
                return;
            }
            _contentLoaded = true;
            System.Uri resourceLocater = new System.Uri("/RentRide;component/addcarpage.xaml", System.UriKind.Relative);
            
            #line 1 "..\..\..\AddCarPage.xaml"
            System.Windows.Application.LoadComponent(this, resourceLocater);
            
            #line default
            #line hidden
        }
        
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [System.CodeDom.Compiler.GeneratedCodeAttribute("PresentationBuildTasks", "9.0.0.0")]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Design", "CA1033:InterfaceMethodsShouldBeCallableByChildTypes")]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Maintainability", "CA1502:AvoidExcessiveComplexity")]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1800:DoNotCastUnnecessarily")]
        void System.Windows.Markup.IComponentConnector.Connect(int connectionId, object target) {
            switch (connectionId)
            {
            case 1:
            this.txtBrand = ((System.Windows.Controls.TextBox)(target));
            return;
            case 2:
            this.txtModel = ((System.Windows.Controls.TextBox)(target));
            return;
            case 3:
            this.txtVNumber = ((System.Windows.Controls.TextBox)(target));
            return;
            case 4:
            this.txtColor = ((System.Windows.Controls.TextBox)(target));
            return;
            case 5:
            this.txtLocation = ((System.Windows.Controls.TextBox)(target));
            return;
            case 6:
            this.txtPrice = ((System.Windows.Controls.TextBox)(target));
            return;
            case 7:
            this.btnChooseFile = ((System.Windows.Controls.Button)(target));
            
            #line 170 "..\..\..\AddCarPage.xaml"
            this.btnChooseFile.Click += new System.Windows.RoutedEventHandler(this.ChooseImage_Click);
            
            #line default
            #line hidden
            return;
            case 8:
            this.txtImagePath = ((System.Windows.Controls.TextBlock)(target));
            return;
            case 9:
            this.imgPreview = ((System.Windows.Controls.Image)(target));
            return;
            case 10:
            
            #line 195 "..\..\..\AddCarPage.xaml"
            ((System.Windows.Controls.Button)(target)).Click += new System.Windows.RoutedEventHandler(this.SaveCar_Click);
            
            #line default
            #line hidden
            return;
            }
            this._contentLoaded = true;
        }
    }
}

