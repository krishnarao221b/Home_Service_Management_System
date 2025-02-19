﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class ServiceSpecParams
    {

        private const int MaxPageSize = 500;
        public int PageIndex { get; set; } = 1;
        private int _pageSize = 15;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
        public int? CategoryId { get; set; }
        public int? TypeId { get; set; }
        public string? Sort { get; set; }
        private string? _search;
        public string? Search
        {
            get => _search;
            set => _search = value.ToLower();
        }
    }
}

